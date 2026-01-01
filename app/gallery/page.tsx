import { PrismaClient } from "@prisma/client";
import GalleryGrid from "@/components/gallery/GalleryGrid";

const prisma = new PrismaClient();

// Force dynamic rendering so new uploads show up instantly
export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">Our Work</h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            A visual archive of transformations. From studio sketches to corporate murals and immersive retreats.
          </p>
        </div>

        {/* Client Component Grid */}
        <GalleryGrid items={items} />

      </div>
    </div>
  );
}