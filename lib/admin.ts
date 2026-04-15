import { prisma } from "@/lib/prisma";

export async function isAdminUser(email?: string | null) {
  if (!email) {
    return false;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
      select: { role: true },
    });

    return user?.role === "ADMIN";
  } catch (error) {
    console.debug("Failed to check admin status", error);
    return false;
  }
}
