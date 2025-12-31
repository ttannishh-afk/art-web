"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions, ADMIN_EMAILS } from "@/lib/auth";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    throw new Error("Unauthorized: You are not an admin.");
  }
}

// 👇 NEW HELPER: Creates a clean, unique filename
// Example: "Sunset Beach" -> "sunset-beach-1714523000.jpg"
function generateFilename(title: string, originalFilename: string) {
  const extension = originalFilename.split(".").pop();
  const cleanTitle = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-") // Replace special chars with hyphens
    .replace(/-+/g, "-");       // Remove duplicate hyphens
  
  // Add timestamp to ensure uniqueness (Solves the "Blob already exists" error)
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

  // 1. Handle Image Upload
  if (imageFile && imageFile.size > 0) {
    // Rename logic
    const filename = generateFilename(title, imageFile.name);
    
    // Upload with new unique name
    const blob = await put(filename, imageFile, { access: 'public' });
    imagePath = blob.url;
  }

  // 2. Database Operation
  if (id) {
    const data: any = { title, description, price, category, stock };
    if (imagePath) {
      data.images = [imagePath];
    }
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
  
  // Optional: You could also delete the file from Vercel Blob here if you wanted, 
  // but for now, we just remove the database record to keep it simple.
  
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
  
  const imageFile = formData.get("image") as File;
  let src = "";

  if (imageFile && imageFile.size > 0) {
    // Rename logic
    const filename = generateFilename(title, imageFile.name);

    // Upload with new unique name
    const blob = await put(filename, imageFile, { access: 'public' });
    src = blob.url;
  }

  if (id) {
    const data: any = { title, year, size };
    if (src) data.src = src;
    await prisma.galleryItem.update({ where: { id }, data });
  } else {
    if (!src) throw new Error("Image is required");
    await prisma.galleryItem.create({
      data: { title, year, size, src },
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
  revalidatePath("/profile"); // Update the user's view too
}