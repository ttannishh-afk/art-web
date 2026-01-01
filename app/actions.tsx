"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions, ADMIN_EMAILS } from "@/lib/auth";
import { put } from "@vercel/blob";

import { prisma } from "@/lib/prisma";

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    throw new Error("Unauthorized: You are not an admin.");
  }
}

function generateFilename(title: string, originalFilename: string) {
  const extension = originalFilename.split(".").pop();
  const cleanTitle = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-");
  
  return `${cleanTitle}-${Date.now()}.${extension}`;
}

// --- SHOP ACTIONS ---

export async function upsertProduct(formData: FormData) {
  await checkAuth();

  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const category = formData.get("category") as any;
  const stock = parseInt(formData.get("stock") as string);
  
  const imageFile = formData.get("image") as File;
  let imagePath = "";

  if (imageFile && imageFile.size > 0) {
    const filename = generateFilename(title, imageFile.name);
    const blob = await put(filename, imageFile, { access: 'public' });
    imagePath = blob.url;
  }

  if (id) {
    const data: any = { title, description, price, category, stock };
    if (imagePath) data.images = [imagePath];
    await prisma.product.update({ where: { id }, data });
  } else {
    if (!imagePath) throw new Error("Image is required for new products");
    await prisma.product.create({
      data: {
        title,
        description,
        price,
        category,
        stock,
        images: [imagePath],
        featured: false,
      },
    });
  }

  revalidatePath("/admin");
  revalidatePath("/shop");
}

export async function deleteProduct(formData: FormData) {
  await checkAuth();
  const id = formData.get("id") as string;
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/shop");
}

// --- GALLERY ACTIONS ---

export async function deleteGalleryItem(formData: FormData) {
  await checkAuth();
  const id = formData.get("id") as string;
  await prisma.galleryItem.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/gallery");
}

export async function upsertGalleryItem(formData: FormData) {
  await checkAuth();

  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const year = formData.get("year") as string;
  const size = formData.get("size") as string;
  // 👇 NEW: Get Category from form
  const category = formData.get("category") as any;
  
  const imageFile = formData.get("image") as File;
  let src = "";

  if (imageFile && imageFile.size > 0) {
    const filename = generateFilename(title, imageFile.name);
    const blob = await put(filename, imageFile, { access: 'public' });
    src = blob.url;
  }

  if (id) {
    // 👇 Update Category
    const data: any = { title, year, size, category };
    if (src) data.src = src;
    await prisma.galleryItem.update({ where: { id }, data });
  } else {
    if (!src) throw new Error("Image is required");
    // 👇 Create with Category
    await prisma.galleryItem.create({
      data: { title, year, size, src, category },
    });
  }

  revalidatePath("/admin");
  revalidatePath("/gallery");
}

export async function updateOrderStatus(formData: FormData) {
  await checkAuth();
  const orderId = formData.get("orderId") as string;
  const newStatus = formData.get("status") as "PENDING" | "PAID" | "SHIPPED";

  await prisma.order.update({
    where: { id: orderId },
    data: { status: newStatus },
  });

  revalidatePath("/admin");
  revalidatePath("/profile");
}

// --- CART ACTIONS ---

export async function addToCart(productId: string) {
  const session = await getServerSession(authOptions);
  
  // If not logged in, we can't add to cart (or you can handle redirect on client)
  if (!session?.user?.email) return { error: "Not logged in" };

  // 1. Get User & Cart
  const user = await prisma.user.findUnique({ 
    where: { email: session.user.email },
    include: { cart: true }
  });

  if (!user) return { error: "User not found" };

  // 2. Create Cart if it doesn't exist
  let cart = user.cart;
  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: user.id }
    });
  }

  // 3. Add Item (or Increment Quantity)
  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId }
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + 1 }
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity: 1 }
    });
  }

  // 4. ⚡️ THE MAGIC FIX ⚡️
  // This forces the Navbar (and every other component) to refresh its data
  revalidatePath("/", "layout");
}

export async function removeFromCart(cartItemId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return;

  await prisma.cartItem.delete({
    where: { id: cartItemId }
  });

  // ⚡️ Refresh the Navbar count immediately
  revalidatePath("/", "layout");
}


// app/actions.tsx

export async function getCart() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return [];

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

  if (!user?.cart?.items) return [];

  return user.cart.items.map(item => ({
    id: item.product.id,
    cartItemId: item.id,
    title: item.product.title,
    
    // 👇 FIX: Convert Decimal to String
    price: item.product.price.toString(),
    
    image: item.product.images[0] || "",
    quantity: item.quantity,
    maxStock: item.product.stock
  }));
}

// ... (keep existing imports and actions)

export async function updateCartItemQuantity(productId: string, newQuantity: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { cart: true }
  });

  if (!user?.cart) return;

  if (newQuantity <= 0) {
    // If quantity is 0 or less, remove the item
    await prisma.cartItem.deleteMany({
      where: { cartId: user.cart.id, productId }
    });
  } else {
    // Otherwise update the quantity
    await prisma.cartItem.updateMany({
      where: { cartId: user.cart.id, productId },
      data: { quantity: newQuantity }
    });
  }

  revalidatePath("/", "layout");
}

// ... (keep all existing imports and code)

// app/actions.tsx

// app/actions.tsx

export async function placeOrder() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return { error: "Not logged in" };

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      cart: {
        include: {
          items: { include: { product: true } }
        }
      }
    }
  });

  // 1. Validate Cart
  if (!user?.cart || user.cart.items.length === 0) {
    return { error: "Cart is empty" };
  }

  // 2. ⚡️ Capture data safely here to satisfy TypeScript
  const cartItems = user.cart.items;
  const cartId = user.cart.id;
  const userId = user.id;

  // Calculate Total
  const total = cartItems.reduce((sum, item) => {
    return sum + (Number(item.product.price) * item.quantity);
  }, 0);

  // 3. Database Transaction
  await prisma.$transaction(async (tx) => {
    
    // Create the Order
    await tx.order.create({
      data: {
        userId: userId,
        total: total,
        status: "PENDING",
        items: {
          create: cartItems.map(item => ({  // 👈 Using the safe variable here
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price
          }))
        }
      }
    });

    // Decrement Stock
    for (const item of cartItems) {
      await tx.product.update({
        where: { id: item.productId },
        data: { 
          stock: { decrement: item.quantity } 
        }
      });
    }

    // Clear the Cart
    await tx.cartItem.deleteMany({
      where: { cartId: cartId }
    });
  });

  // 4. Finish
  revalidatePath("/", "layout");
  revalidatePath("/admin");
  redirect("/success");
}