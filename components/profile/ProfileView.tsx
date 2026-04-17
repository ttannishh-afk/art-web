"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, User as UserIcon } from "lucide-react";
import SignOutButton from "@/components/auth/SignOutButton";

type OrderStatus = "PENDING" | "PAID" | "SHIPPED";

interface ProfileOrderItem {
  id: string;
  quantity: number;
  price: string;
  product: {
    id: string;
    title: string;
    images: string[];
  };
}

interface ProfileOrder {
  id: string;
  createdAt: string | Date;
  total: string;
  status: OrderStatus;
  items: ProfileOrderItem[];
}

interface ProfileUser {
  name: string | null;
  email: string;
  orders: ProfileOrder[];
}

interface ProfileViewProps {
  user: ProfileUser;
}

export default function ProfileView({ user }: ProfileViewProps) {
  const [filterStatus, setFilterStatus] = useState<"ALL" | OrderStatus>("ALL");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID": return "bg-green-100 text-green-800";
      case "SHIPPED": return "bg-blue-100 text-blue-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  // Filter Logic
  const filteredOrders = user.orders.filter((order) => {
    if (filterStatus === "ALL") return true;
    return order.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-white pt-32 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-start justify-between border-b border-gray-100 pb-8 mb-8">
          <div>
            <h1 className="font-serif text-4xl mb-2">My Account</h1>
            <div className="flex items-center gap-2 text-gray-500">
                <UserIcon className="w-4 h-4" />
                <span>{user.name || "Art Collector"}</span>
                <span className="mx-2">•</span>
                <span>{user.email}</span>
            </div>
          </div>
          <SignOutButton />
        </div>

        {/* Orders Title & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h2 className="font-serif text-2xl flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order History
            </h2>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
                {(["ALL", "PENDING", "PAID", "SHIPPED"] as const).map((status) => {
                    const count = status === "ALL" 
                        ? user.orders.length 
                        : user.orders.filter((o) => o.status === status).length;

                    return (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 text-xs font-bold rounded-full border transition-all ${
                                filterStatus === status
                                ? "bg-black text-white border-black"
                                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                            }`}
                        >
                            {status === "ALL" ? "All" : status.charAt(0) + status.slice(1).toLowerCase()} 
                            <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] ${
                                filterStatus === status ? "bg-white text-black" : "bg-gray-100 text-gray-600"
                            }`}>
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-gray-50 p-12 rounded-lg text-center border border-dashed border-gray-200">
            <p className="text-gray-500 mb-4">
                {filterStatus === "ALL" 
                    ? "You haven&apos;t placed any orders yet." 
                    : `No ${filterStatus.toLowerCase()} orders found.`}
            </p>
            {filterStatus === "ALL" && (
                <Link href="/shop" className="text-black font-bold underline hover:text-gray-600">
                Start Collecting
                </Link>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {filteredOrders.map((order) => (
              <div key={order.id} className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
                
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 flex flex-wrap gap-4 justify-between items-center text-sm">
                  <div className="flex gap-8">
                    <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Date Placed</p>
                        <p className="font-medium">
                            {new Date(order.createdAt).toLocaleDateString("en-GB")}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Total</p>
                        <p className="font-medium">$ {Number(order.total).toFixed(2)}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${getStatusColor(order.status)}`}>
                        {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                    {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 mb-4 last:mb-0">
                            <div className="w-16 h-16 bg-gray-100 relative overflow-hidden rounded-sm flex-shrink-0">
                                <Image
                                    src={item.product.images[0]}
                                    alt={item.product.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    loading="eager"
                                    className="object-cover"
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
