import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, User as UserIcon, LogOut } from "lucide-react";

import SignOutButton from "@/components/auth/SignOutButton"; // We will create this small helper

const prisma = new PrismaClient();

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/"); // Redirect to home if not logged in
  }

  // Fetch User & Orders
  const user = await prisma.user.findUnique({
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

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white pt-32 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-start justify-between border-b border-gray-100 pb-8 mb-12">
          <div>
            <h1 className="font-serif text-4xl mb-2">My Account</h1>
            <div className="flex items-center gap-2 text-gray-500">
                <UserIcon className="w-4 h-4" />
                <span>{user.name || "Art Collector"}</span>
                <span className="mx-2">•</span>
                <span>{user.email}</span>
            </div>
          </div>
          
          {/* Logout Button Component */}
          <SignOutButton />
        </div>

        {/* Orders Section */}
        <h2 className="font-serif text-2xl mb-6 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Order History
        </h2>

        {user.orders.length === 0 ? (
          <div className="bg-gray-50 p-12 rounded-lg text-center">
            <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
            <Link href="/shop" className="text-black font-bold underline hover:text-gray-600">
              Start Collecting
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {user.orders.map((order) => (
              <div key={order.id} className="border border-gray-100 rounded-lg overflow-hidden">
                
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 flex flex-wrap gap-4 justify-between items-center text-sm">
                  <div className="flex gap-8">
                    <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Date Placed</p>
                        <p className="font-medium">
                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Total</p>
                        <p className="font-medium">$ {Number(order.total).toFixed(2)}</p>
                    </div>
                  </div>
                  <div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                        {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                    {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 mb-4 last:mb-0">
                            <div className="w-16 h-16 bg-gray-100 relative overflow-hidden rounded-sm flex-shrink-0">
                                <img 
                                    src={item.product.images[0]} 
                                    alt={item.product.title} 
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="flex-1">
                                <Link href={`/product/${item.product.id}`} className="font-serif text-lg hover:underline">
                                    {item.product.title}
                                </Link>
                                <p className="text-sm text-gray-500">
                                    Qty: {item.quantity} × ${Number(item.price).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}