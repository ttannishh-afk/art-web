import Image from "next/image"; 

// Hardcoded gallery data (Simulating a curated portfolio)
// In the future, you could add a "GALLERY" category to your database if you want these dynamic.
const galleryItems = [
  {
    id: 1,
    src: "/images/gallery-1.jpg",
    title: "Midnight Solace",
    year: "2023",
    size: "tall" // CSS class helper
  },
  {
    id: 2,
    src: "/images/gallery-2.jpg",
    title: "Chaos Theory V",
    year: "2022",
    size: "wide"
  },
  {
    id: 3,
    src: "/images/gallery-3.jpg",
    title: "Ethereal Form",
    year: "2024",
    size: "tall"
  },
  {
    id: 4,
    src: "/images/gallery-1.jpg",
    title: "Golden Hour",
    year: "2023",
    size: "wide"
  },
  {
    id: 5,
    src: "/images/gallery-2.jpg",
    title: "Figure Study No. 5",
    year: "2021",
    size: "small"
  },
  {
    id: 6,
    src: "/images/gallery-3.jpg",
    title: "Misty Mountains",
    year: "2022",
    size: "tall"
  },
];

// ... (Your galleryItems array stays here) ...

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header (Same as before) */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">Selected Works</h1>
          <p className="text-gray-500 text-lg font-light leading-relaxed">
            A curation of personal projects, commissions, and studies.
          </p>
        </div>

        {/* OPTIMIZED MASONRY GRID */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {galleryItems.map((item) => (
            <div key={item.id} className="break-inside-avoid group relative">
              <div className="relative overflow-hidden rounded-sm bg-gray-100">
                {/* THE MAGIC "RESPONSIVE" NEXT/IMAGE SETUP */}
                <Image
                  src={item.src}
                  alt={item.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay (Same as before) */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
                  <h3 className="font-serif text-2xl mb-2 italic">{item.title}</h3>
                  <p className="text-sm tracking-widest uppercase opacity-80">{item.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer Note (Same as before) */}
        <div className="mt-24 text-center border-t border-gray-100 pt-12">
          <p className="text-gray-400 font-serif italic text-lg">
            "Art is not what you see, but what you make others see."
          </p>
        </div>
      </div>
    </div>
  );
}