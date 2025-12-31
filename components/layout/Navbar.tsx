import { getServerSession } from "next-auth";
import { authOptions, ADMIN_EMAILS } from "@/lib/auth"; // 👈 Import ADMIN_EMAILS
import { PrismaClient } from "@prisma/client";
import NavbarClient from "./NavbarClient";

const prisma = new PrismaClient();

export async function Navbar() {
  const session = await getServerSession(authOptions);
  let cartCount = 0;
  let isAdmin = false; // Default to false

  if (session?.user?.email) {
    // 1. Check if user is Admin
    isAdmin = ADMIN_EMAILS.includes(session.user.email);

    // 2. Calculate Cart Count
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { 
        cart: { 
          include: { items: true } 
        } 
      }
    });

    if (user?.cart?.items) {
      cartCount = user.cart.items.reduce((sum, item) => sum + item.quantity, 0);
    }
  }

  // Pass 'isAdmin' to the client component
  return <NavbarClient cartCount={cartCount} isAdmin={isAdmin} />;
}