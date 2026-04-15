import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  formatErrorMessage,
  requireNonNegativeInteger,
  requireUuidLike,
} from "@/lib/validation";

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
    .filter((item) => item.quantity > 0)
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
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();
    const validatedProductId = requireUuidLike(productId, "Product");

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { cart: true }
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const product = await prisma.product.findUnique({
      where: { id: validatedProductId },
      select: { id: true, stock: true },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.stock < 1) {
      return NextResponse.json({ error: "Product is out of stock" }, { status: 400 });
    }

    let cartId = user.cart?.id;
    if (!cartId) {
      const newCart = await prisma.cart.create({ data: { userId: user.id } });
      cartId = newCart.id;
    }

    const existing = await prisma.cartItem.findFirst({
      where: { cartId, productId: validatedProductId }
    });

    if (existing) {
      return NextResponse.json({ message: "Item already in cart" });
    }

    await prisma.cartItem.create({
      data: {
        cartId,
        productId: validatedProductId,
        quantity: 1
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: formatErrorMessage(error, "Unable to update the cart.") },
      { status: 400 },
    );
  }
}

// 3. PUT: Update Quantity OR Remove Item
export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { productId, quantity } = await req.json();
    const validatedProductId = requireUuidLike(productId, "Product");
    const validatedQuantity = requireNonNegativeInteger(quantity, "Quantity");

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { cart: true }
    });

    if (!user || !user.cart) return NextResponse.json({ error: "Cart not found" }, { status: 404 });

    if (validatedQuantity === 0) {
      await prisma.cartItem.deleteMany({
        where: {
          cartId: user.cart.id,
          productId: validatedProductId,
        }
      });
    } else {
      const product = await prisma.product.findUnique({
        where: { id: validatedProductId },
        select: { stock: true },
      });

      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }

      if (validatedQuantity > product.stock) {
        return NextResponse.json(
          { error: `Only ${product.stock} item(s) currently available.` },
          { status: 400 },
        );
      }

      await prisma.cartItem.updateMany({
        where: {
          cartId: user.cart.id,
          productId: validatedProductId,
        },
        data: {
          quantity: validatedQuantity
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: formatErrorMessage(error, "Unable to update the cart.") },
      { status: 400 },
    );
  }
}
