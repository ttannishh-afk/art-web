import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NavbarClient from "./NavbarClient";
import { prisma } from "@/lib/prisma";

export async function Navbar() {
  const session = await getServerSession(authOptions);
  let isAdmin = false;

  if (session?.user?.email) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { role: true },
      });

      isAdmin = user?.role === "ADMIN";
    } catch (error) {
      console.debug("Navbar: Unable to fetch user data", error);
    }
  }

  return <NavbarClient isAdmin={isAdmin} />;
}
