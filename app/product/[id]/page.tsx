import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { ShoppingBag, Check } from "lucide-react";
import { AddToCartButton } from "@/components/shop/AddToCartButton";

// 1. Update the interface to expect a Promise
interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // 2. AWAIT the params before using them
  const { id } = await params;

  // 3. Fetch the specific product using the awaited ID
  const product = await db.product.findUnique({
    where: {
      id: id,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        
        {/* LEFT: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-gray-100 overflow-hidden w-full">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT: Details & Buy */}
        <div className="sticky top-32">
          <div className="mb-8">
            <h1 className="font-serif text-4xl md:text-5xl text-black mb-2">
              {product.title}
            </h1>
            <p className="text-xl text-gray-600 font-light">
              ${Number(product.price).toFixed(2)}
            </p>
          </div>

          <div className="prose prose-stone mb-8 text-gray-600">
            <p>{product.description}</p>
          </div>

          <div className="space-y-4 border-t border-gray-100 pt-8">
            <div className="flex items-center text-sm text-gray-500">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              {product.stock > 0 ? "In Stock & Ready to Ship" : "Currently Out of Stock"}
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium mr-2">Category:</span> 
              <span className="capitalize">{product.category.toLowerCase()}</span>
            </div>
          </div>

          {/* Add to Cart Button */}
        <AddToCartButton 
  disabled={product.stock === 0}
  data={{
    id: product.id,
    title: product.title,
    price: product.price.toString(), // Convert Decimal to string
    image: product.images[0]
  }}
/>
        </div>
      </div>
    </div>
  );
}