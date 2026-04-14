import { Category } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

interface ShopPageProps {
  searchParams: Promise<{ cat?: string }>; 
}

export default async function ShopPage(props: ShopPageProps) {
  const searchParams = await props.searchParams;
  const selectedCategory = searchParams.cat;

  const products = await prisma.product.findMany({
    where: selectedCategory ? { category: selectedCategory as Category } : undefined,
    orderBy: { createdAt: 'desc' }
  });

  const categories = [
    { label: "All Works", value: undefined },
    { label: "Oil", value: "OIL" },
    { label: "Acrylic", value: "ACRYLIC" },
    { label: "Watercolor", value: "WATERCOLOR" },
    { label: "Sketches", value: "SKETCH" },
  ];

  return (
    <div className="min-h-screen bg-white pt-32 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-6 gap-6">
          <div>
            <h1 className="font-serif text-4xl mb-2">Collected Works</h1>
            <p className="text-gray-500 font-light">
              {products.length} {products.length === 1 ? "piece" : "pieces"} available
            </p>
          </div>

          <div className="flex flex-wrap gap-4 md:gap-8">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <Link
                  key={cat.label}
                  href={cat.value ? `/shop?cat=${cat.value}` : "/shop"}
                  className={`text-sm uppercase tracking-widest transition-colors ${
                    isActive 
                      ? "text-black font-bold border-b-2 border-black pb-1" 
                      : "text-gray-400 hover:text-black pb-1 border-b-2 border-transparent"
                  }`}
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>
        </div>
        
        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-xl text-gray-400 font-serif">No artworks found in this category.</h2>
            <Link href="/shop" className="text-black underline mt-4 block">View all works</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group block">
                
                {/* 2. THE OPTIMIZED IMAGE CONTAINER */}
                <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill // <--- Fills the parent container
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Helps browser pick the right size
                  />
                  
                  {/* Status Overlay */}
                  {product.stock === 0 ? (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px] z-10">
                      <span className="text-white font-bold tracking-[0.2em] text-lg border-2 border-white px-4 py-2">
                        SOLD OUT
                      </span>
                    </div>
                  ) : (
                    product.stock <= 2 && (
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-xs px-2 py-1 uppercase tracking-wider translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                        Only {product.stock} Left
                      </div>
                    )
                  )}
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-xl group-hover:underline decoration-1 underline-offset-4">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">
                      {product.category}
                    </p>
                  </div>
                  <p className="font-medium text-lg">
                    ${Number(product.price).toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
