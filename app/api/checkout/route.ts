import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    // 1. Get the list of product IDs from the cart
    const { productIds } = await req.json();

    if (!productIds || productIds.length === 0) {
      return new NextResponse("Product IDs are required", { status: 400 });
    }

    // 2. Fetch actual products from DB (Secure price calculation)
    const products = await db.product.findMany({
      where: {
        id: {
          in: productIds
        }
      }
    });

    // 3. Calculate Total Price
    const total = products.reduce((sum, product) => {
      return sum + Number(product.price);
    }, 0);

    // 4. Create the Order in Database
    const order = await db.order.create({
      data: {
        total: total,
        status: "PAID", // Simulating a successful payment
        userId: null,   // Guest Checkout for now
        items: {
          create: products.map((product) => ({
            product: {
              connect: {
                id: product.id
              }
            },
            quantity: 1,
            price: product.price
          }))
        }
      }
    });

    // 5. Update Stock (Optional but "Proper")
    // For each product bought, reduce stock by 1
    /* for (const product of products) {
        await db.product.update({
            where: { id: product.id },
            data: { stock: product.stock - 1 }
        });
    }
    */

    return NextResponse.json({ success: true, orderId: order.id }, { headers: corsHeaders });

  } catch (error) {
    console.log("[CHECKOUT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}