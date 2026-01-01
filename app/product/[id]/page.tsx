import { notFound } from "next/navigation";
import AddToCartButton from "@/components/shop/AddToCartButton";
import Image from "next/image";
import { getServerSession } from "next-auth"; // 👈 New Import
import { authOptions } from "@/lib/auth";     // 👈 New Import

import { prisma } from "@/lib/prisma";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params;
  const session = await getServerSession(authOptions); // 👈 Get Session

  // 1. Fetch Product
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) return notFound();

  // 2. Check if Item is in Cart
  let isInCart = false;
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { 
        cart: { 
          include: { items: true } 
        } 
      }
    });

    if (user?.cart?.items) {
      isInCart = user.cart.items.some(item => item.productId === product.id);
    }
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        
        {/* Image Section */}
        <div className="relative aspect-[3/4] bg-gray-50 border border-gray-100">
           <Image
             src={product.images[0]}
             alt={product.title}
             fill
             className="object-cover"
             sizes="(max-width: 768px) 100vw, 50vw"
             priority
           />
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-center">
            <h1 className="font-serif text-4xl md:text-5xl mb-4">{product.title}</h1>
            <p className="text-sm tracking-widest text-gray-400 uppercase mb-8">{product.category}</p>
            <p className="text-xl font-medium mb-8">$ {Number(product.price).toFixed(2)}</p>
            <div className="prose prose-sm text-gray-500 mb-10 leading-relaxed">
                <p>{product.description}</p>
            </div>
            
            {/* 3. Pass 'isInCart' prop to the button */}
            {product.stock > 0 ? (
              <AddToCartButton 
                isInCart={isInCart} // 👈 Passing the status
                data={{
                  id: product.id,
                  title: product.title,
                  price: product.price.toString(),
                  image: product.images[0],
                  maxStock: product.stock
                }} 
              />
            ) : (
              <button disabled className="w-full bg-gray-200 text-gray-500 py-4 font-bold tracking-widest cursor-not-allowed">
                SOLD OUT
              </button>
            )}
            
            <div className="mt-12 border-t border-gray-100 pt-8 text-xs text-gray-400 space-y-2">
                <p>• Authenticity Certificate included</p>
                <p>• Free worldwide shipping on originals</p>
                <p>• 14-day satisfaction guarantee</p>
            </div>
        </div>
      </div>
    </div>
  );
}