"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

// 1. Define your slides here
const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2800&auto=format&fit=crop",
    title: "Visual Alchemy",
    subtitle: "The portfolio and store of Tanish Gupta. Exploring the boundary between digital precision and organic chaos."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2800&auto=format&fit=crop",
    title: "Neon Horizon",
    subtitle: "Capturing the electric soul of the city at midnight. Where light meets the infinite dark."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2800&auto=format&fit=crop",
    title: "Abstract Flow",
    subtitle: "A study in fluid dynamics and color theory. The silence of motion frozen in time."
  }
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  // Cycle slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-black">
        
        {/* Background Slideshow */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-60" : "opacity-0"
            }`}
          >
            <img 
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
        ))}

        {/* Floating Text - Dynamic based on current slide */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current} // This key forces the animation to restart when slide changes
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-serif text-5xl md:text-8xl text-white tracking-tighter mb-6">
                {slides[current].title}
              </h1>
              
              <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto font-light tracking-wide">
                {slides[current].subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link 
                  href="/shop"
                  className="group px-8 py-4 bg-white text-black font-medium text-sm tracking-widest hover:bg-gray-200 transition-all flex items-center justify-center"
                >
                  ENTER SHOP
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* --- FEATURED SECTION --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-serif text-4xl text-black">Latest Works</h2>
            <Link href="/shop" className="text-sm font-medium border-b border-black pb-1 hover:text-gray-600">
              VIEW ALL
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="overflow-hidden bg-gray-100 aspect-[3/4] mb-4">
                  <img 
                    src={"/images/gallery-1.jpg" }
                    alt="Art"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                </div>
                <h3 className="font-serif text-xl">Ethereal Form #{i}</h3>
                <p className="text-gray-500 text-sm mt-1">$250.00</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}