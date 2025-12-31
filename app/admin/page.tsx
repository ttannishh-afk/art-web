import { getServerSession } from "next-auth";
import { authOptions, ADMIN_EMAILS } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import AdminView from "@/components/admin/AdminView";

const prisma = new PrismaClient();

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    return <div className="p-20 text-center text-red-600">Access Denied</div>;
  }

  // 1. Fetch Data
  const rawProducts = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  const galleryItems = await prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" } });
  
  // 👇 Fetch Orders with Customer & Items
  const rawOrders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
        user: true, // Get Customer Name/Email
        items: {
            include: { product: true } // Get Product Details
        }
    }
  });

  // 2. SERIALIZATION: Fix 'Decimal' objects for Client Component
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
        />
      </div>
    </div>
  );
}