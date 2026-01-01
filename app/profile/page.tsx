import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import ProfileView from "@/components/profile/ProfileView"; // 👈 Import the new view

const prisma = new PrismaClient();

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/"); 
  }

  // 1. Fetch User & Orders
  const rawUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
        include: {
          items: {
            include: { product: true }
          }
        }
      }
    }
  });

  if (!rawUser) return null;

  // 2. SERIALIZATION: Convert Decimals to Strings
  // This is required when passing data to a Client Component
  const user = {
    ...rawUser,
    orders: rawUser.orders.map((order) => ({
      ...order,
      total: order.total.toString(),
      items: order.items.map((item) => ({
        ...item,
        price: item.price.toString(),
        product: {
            ...item.product,
            price: item.product.price.toString()
        }
      }))
    }))
  };

  // 3. Render the interactive view
  return <ProfileView user={user} />;
}