import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProfileView from "@/components/profile/ProfileView";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/"); 
  }

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

  return <ProfileView user={user} />;
}
