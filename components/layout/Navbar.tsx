import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NavbarClient from "./NavbarClient";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

export async function Navbar() {
  const session = await getServerSession(authOptions);
  let cartCount = 0;
  let isAdmin = false;

  if (session?.user?.email) {
    isAdmin = isAdminEmail(session.user.email);

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
