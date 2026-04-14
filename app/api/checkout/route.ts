import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 1. Get User and Cart
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      cart: {
        include: {
          items: {
            include: { product: true }
          }
        }
      }
    }
  });

  if (!user || !user.cart || user.cart.items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  // 2. CHECK STOCK for all items before processing
  for (const item of user.cart.items) {
    if (item.product.stock < item.quantity) {
      return NextResponse.json(
        { error: `Sorry, ${item.product.title} is out of stock (Only ${item.product.stock} left).` }, 
        { status: 400 }
      );
    }
  }

  // 3. Process Order & REDUCE STOCK
  // We use a transaction to ensure stock is only reduced if order succeeds
  try {
    const result = await prisma.$transaction(async (tx) => {
      
      // A. Create Order
      const total = user.cart!.items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);
      
      const order = await tx.order.create({
        data: {
          userId: user.id,
          total: total,
          status: "PAID",
          items: {
            create: user.cart!.items.map((item) => ({
              productId: item.product.id,
              quantity: item.quantity,
              price: item.product.price
            }))
          }
        }
      });

      // B. Reduce Stock for each item
      for (const item of user.cart!.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });
      }

      // C. Clear Cart
      await tx.cartItem.deleteMany({
        where: { cartId: user.cart!.id }
      });

      return order;
    });

    return NextResponse.json({ success: true, orderId: result.id });

  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: "Transaction failed" }, { status: 500 });
  }
}
