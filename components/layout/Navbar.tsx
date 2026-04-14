import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NavbarClient from "./NavbarClient";
import { prisma } from "@/lib/prisma";

export async function Navbar() {
  const session = await getServerSession(authOptions);
  let cartCount = 0;
  let isAdmin = false;

  if (session?.user?.email) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { 
          cart: { 
            include: { items: true } 
          }
        },
        select: {
          role: true,
          cart: true,
        }
      });

      if (user?.cart?.items) {
        cartCount = user.cart.items.reduce((sum, item) => sum + item.quantity, 0);
      }

      isAdmin = user?.role === "ADMIN";
    } catch (error) {
      console.debug("Navbar: Unable to fetch user data", error);
    }
  }

  // Pass 'isAdmin' to the client component
  return <NavbarClient cartCount={cartCount} isAdmin={isAdmin} />;
}
