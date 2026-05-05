"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  formatErrorMessage,
  requireCategory,
  requireGalleryCategory,
  requireInquiryStatus,
  requireNonNegativeInteger,
  requireOrderStatus,
  requirePrice,
  requireText,
  requireUuidLike,
  validateImageFile,
} from "@/lib/validation";

async function requireAdminSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized: You must be logged in.");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  });

  if (user?.role !== "ADMIN") {
    throw new Error("Unauthorized: You are not an admin.");
  }

  return session;
}

function generateFilename(title: string, originalFilename: string) {
  const extension = originalFilename.split(".").pop()?.toLowerCase() || "jpg";
  const cleanTitle = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return `${cleanTitle || "upload"}-${Date.now()}.${extension}`;
}

async function uploadImage(title: string, file: File | null) {
  if (!file) {
    return "";
  }

  const filename = generateFilename(title, file.name);
  const blob = await put(filename, file, { access: "public" });

  return blob.url;
}

export async function upsertProduct(formData: FormData) {
  await requireAdminSession();

  const id = formData.get("id");
  const title = requireText(formData.get("title"), "Title", { max: 120 });
  const description = requireText(formData.get("description"), "Description", {
    min: 10,
    max: 2000,
  });
  const price = requirePrice(formData.get("price"));
  const category = requireCategory(formData.get("category"));
  const stock = requireNonNegativeInteger(formData.get("stock"), "Stock");
  const imageFile = validateImageFile(formData.get("image"), !id);

  const imagePath = await uploadImage(title, imageFile);

  if (id) {
    const productId = requireUuidLike(id, "Product");
    const data: {
      title: string;
      description: string;
      price: number;
      category: typeof category;
      stock: number;
      images?: string[];
    } = { title, description, price, category, stock };

    if (imagePath) {
      data.images = [imagePath];
    }

    await prisma.product.update({ where: { id: productId }, data });
    revalidatePath(`/product/${productId}`);
  } else {
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
  await requireAdminSession();
  const id = requireUuidLike(formData.get("id"), "Product");

  await prisma.product.delete({ where: { id } });

  revalidatePath("/admin");
  revalidatePath("/shop");
}

export async function deleteGalleryItem(formData: FormData) {
  await requireAdminSession();
  const id = requireUuidLike(formData.get("id"), "Gallery item");

  await prisma.galleryItem.delete({ where: { id } });

  revalidatePath("/admin");
  revalidatePath("/gallery");
}

export async function upsertGalleryItem(formData: FormData) {
  await requireAdminSession();

  const id = formData.get("id");
  const title = requireText(formData.get("title"), "Title", { max: 120 });
  const date = requireText(formData.get("date"), "Date (mm/yyyy)", { max: 20 });
  
  // Validate mm/yyyy format
  if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(date)) {
    throw new Error("Date must be in mm/yyyy format.");
  }
  
  const yearInt = parseInt(date.split("/")[1], 10);
  const currentYear = new Date().getFullYear();
  if (yearInt < 1900 || yearInt > currentYear) {
    throw new Error(`Year must be between 1900 and ${currentYear}.`);
  }
  
  const size = requireText(formData.get("size"), "Size", { max: 20 });
  const category = requireGalleryCategory(formData.get("category"));
  const onHomepage = formData.get("onHomepage") === "true";
  const imageFile = validateImageFile(formData.get("image"), !id);
  const src = await uploadImage(title, imageFile);

  if (id) {
    const galleryItemId = requireUuidLike(id, "Gallery item");
    const data: {
      title: string;
      date: string;
      size: string;
      category: typeof category;
      onHomepage: boolean;
      src?: string;
    } = { title, date, size, category, onHomepage };

    if (src) {
      data.src = src;
    }

    await prisma.galleryItem.update({ where: { id: galleryItemId }, data });
  } else {
    await prisma.galleryItem.create({
      data: { title, date, size, src, category, onHomepage },
    });
  }

  revalidatePath("/admin");
  revalidatePath("/gallery");
}

export async function updateOrderStatus(formData: FormData) {
  await requireAdminSession();

  const orderId = requireUuidLike(formData.get("orderId"), "Order");
  const newStatus = requireOrderStatus(formData.get("status"));

  await prisma.order.update({
    where: { id: orderId },
    data: { status: newStatus },
  });

  revalidatePath("/admin");
  revalidatePath("/profile");
}

export async function updateInquiryStatus(formData: FormData) {
  await requireAdminSession();

  const inquiryId = requireUuidLike(formData.get("inquiryId"), "Inquiry");
  const newStatus = requireInquiryStatus(formData.get("status"));

  await prisma.contactInquiry.update({
    where: { id: inquiryId },
    data: { status: newStatus },
  });

  revalidatePath("/admin");
}

export async function addToCart(productId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return { error: "Not logged in" };
    }

    const validatedProductId = requireUuidLike(productId, "Product");

    const [user, product] = await Promise.all([
      prisma.user.findUnique({
        where: { email: session.user.email },
        include: { cart: true },
      }),
      prisma.product.findUnique({
        where: { id: validatedProductId },
        select: { id: true, stock: true },
      }),
    ]);

    if (!user) {
      return { error: "User not found" };
    }

    if (!product) {
      return { error: "Product not found" };
    }

    if (product.stock < 1) {
      return { error: "This artwork is sold out." };
    }

    let cart = user.cart;
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.id },
      });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId: validatedProductId },
    });

    if (existingItem) {
      return { error: "This artwork is already in your cart." };
    }

    await prisma.cartItem.create({
      data: { cartId: cart.id, productId: validatedProductId, quantity: 1 },
    });

    revalidatePath("/", "layout");
    revalidatePath("/cart");

    return { success: true };
  } catch (error) {
    return { error: formatErrorMessage(error, "Unable to add this item to your cart.") };
  }
}

export async function removeFromCart(cartItemId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return;

  const validatedCartItemId = requireUuidLike(cartItemId, "Cart item");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { cart: true },
  });

  if (!user?.cart) return;

  await prisma.cartItem.deleteMany({
    where: {
      id: validatedCartItemId,
      cartId: user.cart.id,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/cart");
}

export async function getCart() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return [];

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      cart: {
        include: {
          items: {
            include: { product: true },
          },
        },
      },
    },
  });

  if (!user?.cart?.items) return [];

  return user.cart.items
    .filter((item) => item.quantity > 0)
    .map((item) => ({
      id: item.product.id,
      cartItemId: item.id,
      title: item.product.title,
      price: item.product.price.toString(),
      image: item.product.images[0] || "",
      quantity: item.quantity,
      maxStock: item.product.stock,
    }));
}

export async function updateCartItemQuantity(productId: string, newQuantity: number) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return { error: "Not logged in" };

    const validatedProductId = requireUuidLike(productId, "Product");
    const validatedQuantity = requireNonNegativeInteger(newQuantity, "Quantity");

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { cart: true },
    });

    if (!user?.cart) return { error: "Cart not found" };

    if (validatedQuantity <= 0) {
      await prisma.cartItem.deleteMany({
        where: { cartId: user.cart.id, productId: validatedProductId },
      });
    } else {
      const product = await prisma.product.findUnique({
        where: { id: validatedProductId },
        select: { stock: true },
      });

      if (!product) {
        return { error: "Product not found" };
      }

      if (validatedQuantity > product.stock) {
        return { error: `Only ${product.stock} item(s) currently available.` };
      }

      await prisma.cartItem.updateMany({
        where: { cartId: user.cart.id, productId: validatedProductId },
        data: { quantity: validatedQuantity },
      });
    }

    revalidatePath("/", "layout");
    revalidatePath("/cart");

    return { success: true };
  } catch (error) {
    return { error: formatErrorMessage(error, "Unable to update your cart.") };
  }
}

export async function placeOrder() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return { error: "Not logged in" };

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      cart: {
        include: {
          items: { include: { product: true } },
        },
      },
    },
  });

  if (!user?.cart || user.cart.items.length === 0) {
    return { error: "Cart is empty" };
  }

  const cartItems = user.cart.items;
  const cartId = user.cart.id;
  const userId = user.id;

  for (const item of cartItems) {
    if (item.quantity <= 0) {
      return { error: `Invalid quantity for ${item.product.title}.` };
    }

    if (item.product.stock < item.quantity) {
      return {
        error: `Only ${item.product.stock} item(s) left for ${item.product.title}.`,
      };
    }
  }

  const total = cartItems.reduce((sum, item) => {
    return sum + Number(item.product.price) * item.quantity;
  }, 0);

  await prisma.$transaction(async (tx) => {
    await tx.order.create({
      data: {
        userId,
        total,
        status: "PENDING",
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    for (const item of cartItems) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: { decrement: item.quantity },
        },
      });
    }

    await tx.cartItem.deleteMany({
      where: { cartId },
    });
  });

  revalidatePath("/", "layout");
  revalidatePath("/admin");
  revalidatePath("/cart");
  revalidatePath("/profile");

  redirect("/success");
}
