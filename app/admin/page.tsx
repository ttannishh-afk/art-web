import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminView from "@/components/admin/AdminView";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center max-w-md">
          <h1 className="text-3xl font-serif text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-500">You do not have permission to access the admin command center. If you believe this is an error, please contact support.</p>
        </div>
      </div>
    );
  }

  // Fetch user and check role
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  });

  if (user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center max-w-md">
          <h1 className="text-3xl font-serif text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-500">You do not have permission to access the admin command center. If you believe this is an error, please contact support.</p>
        </div>
      </div>
    );
  }

  // 1. Fetch Data
  const rawProducts = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  const galleryItems = await prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" } });
  
  // 👇 Fetch Orders with Customer & Items
  const rawOrders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
        user: true,
        items: {
            include: { product: true }
        }
    }
  });
  const inquiries = await prisma.contactInquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  const products = rawProducts.map((p) => ({ ...p, price: p.price.toString() }));
  
  const orders = rawOrders.map((order) => ({
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
  }));

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
            <h1 className="font-serif text-4xl">Studio Command Center</h1>
            <p className="text-sm text-gray-500 font-mono">{session.user.email}</p>
        </div>
        
        {/* Pass orders to the view */}
        <AdminView 
            products={products} 
            galleryItems={galleryItems} 
            orders={orders}
            inquiries={inquiries}
        />
      </div>
    </div>
  );
}
