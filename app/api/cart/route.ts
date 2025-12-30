import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

// 1. GET: Fetch Cart (Includes maxStock logic)
export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return NextResponse.json([], { status: 401 });
  }

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

  if (!user || !user.cart) return NextResponse.json([]);

  // Inside the formattedItems map...
  const formattedItems = user.cart.items
    .filter((item) => item.quantity > 0) // <--- ADD THIS FILTER
    .map((item) => ({
      id: item.product.id,
      title: item.product.title,
      price: item.product.price.toString(),
      image: item.product.images[0] || "",
      quantity: item.quantity,
      maxStock: item.product.stock 
  }));

  return NextResponse.json(formattedItems);
}

// 2. POST: Add Item to Cart
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { cart: true }
  });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  let cartId = user.cart?.id;
  if (!cartId) {
    const newCart = await prisma.cart.create({ data: { userId: user.id } });
    cartId = newCart.id;
  }

  const existing = await prisma.cartItem.findFirst({
    where: { cartId, productId }
  });

  if (existing) {
    return NextResponse.json({ message: "Item already in cart" });
  }

  await prisma.cartItem.create({
    data: {
      cartId,
      productId,
      quantity: 1
    }
  });

  return NextResponse.json({ success: true });
}

// 3. PUT: Update Quantity OR Remove Item
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { productId, quantity } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { cart: true }
  });

  if (!user || !user.cart) return NextResponse.json({ error: "Cart not found" }, { status: 404 });

  // LOGIC CHANGE: If quantity is 0, DELETE the item. Otherwise, UPDATE it.
  if (quantity === 0) {
    await prisma.cartItem.deleteMany({
      where: {
        cartId: user.cart.id,
        productId: productId,
      }
    });
  } else {
    await prisma.cartItem.updateMany({
      where: {
        cartId: user.cart.id,
        productId: productId,
      },
      data: {
        quantity: quantity
      }
    });
  }

  return NextResponse.json({ success: true });
}