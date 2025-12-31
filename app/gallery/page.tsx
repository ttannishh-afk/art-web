import { PrismaClient } from "@prisma/client";
import Image from "next/image";

const prisma = new PrismaClient();

export default async function GalleryPage() {
  // 1. Fetch from Database (Newest First)
  const items = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">Portfolio</h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            A selection of works from {new Date().getFullYear()}. 
            Original pieces exploring light, texture, and form.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="group relative break-inside-avoid mb-8">
              
              {/* Image Container */}
              <div className={`relative bg-gray-100 overflow-hidden ${
                // Optional: Adjust aspect ratio based on your 'size' field
                item.size === "tall" ? "aspect-[3/4]" : 
                item.size === "wide" ? "aspect-[4/3]" : "aspect-square"
              }`}>
                <Image 
                  src={item.src} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
                  <h3 className="font-serif text-2xl italic mb-2">{item.title}</h3>
                  <p className="text-xs tracking-widest uppercase">{item.year} • {item.size}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 italic">Gallery is currently being curated. Check back soon.</p>
          </div>
        )}

      </div>
    </div>
  );
}