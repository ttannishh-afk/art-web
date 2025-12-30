import Image from "next/image"; // <--- Import

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            {/* OPTIMIZED PROFILE PICTURE */}
            <div className="relative aspect-[3/4] bg-gray-100">
                <Image 
                    src="/images/gallery-1.jpg" // Ensure this file exists!
                    alt="Tanish Gupta" 
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
            {/* ... Rest of the text content ... */}
            <div>
                <h1 className="font-serif text-5xl mb-6">Visual Alchemy</h1>
                <p className="text-gray-500 text-lg leading-relaxed mb-6">
                    Hi, I'm Tanish Gupta. I am an artist and developer based in India...
                </p>
                <p className="text-gray-500 text-lg leading-relaxed">
                    My work is driven by a curiosity about how technology interprets nature...
                </p>
            </div>
        </div>

        {/* ... Rest of the file ... */}
        <div className="border-t border-gray-100 pt-16">
           {/* ... Statement ... */}
        </div>

      </div>
    </div>
  );
}