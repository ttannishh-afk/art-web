import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// This is a Server Component (runs on the backend)
export default async function ShopPage() {
  // 1. Fetch products from the Database
  const products = await db.product.findMany({
    orderBy: {
      createdAt: 'desc', // Newest items first
    },
  });

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h1 className="font-serif text-5xl md:text-6xl text-black mb-4">
          All Works
        </h1>
        <p className="text-gray-500 max-w-md">
          Original paintings, limited edition prints, and digital collectibles.
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id} className="group block">
            {/* Image Container */}
            <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden mb-4">
              <img
                src={product.images[0]}
                alt={product.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              
              {/* "Sold Out" Badge */}
              {product.stock === 0 && (
                <div className="absolute top-4 right-4 bg-black text-white text-xs px-2 py-1 uppercase tracking-wider">
                  Sold Out
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif text-xl text-black group-hover:text-gray-600 transition-colors">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 capitalize">
                  {product.category.toLowerCase()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-black">
                  ${Number(product.price).toFixed(2)}
                </p>
                {/* Arrow Icon on Hover */}
                <ArrowUpRight className="h-4 w-4 ml-auto mt-2 opacity-0 -translate-y-2 -translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}