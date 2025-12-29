"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-black">
        
        {/* Background Image (James Jean Style) */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2800&auto=format&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Floating Text */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="font-serif text-5xl md:text-8xl text-white tracking-tighter mb-6">
              Visual <span className="italic font-light text-white/80">Alchemy</span>
            </h1>
            
            <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto font-light tracking-wide">
              The portfolio and store of Tanish Gupta. 
              Exploring the boundary between digital precision and organic chaos.
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
        </div>
      </section>

      {/* --- FEATURED SECTION (Scroll Down) --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-serif text-4xl text-black">Latest Works</h2>
            <Link href="/shop" className="text-sm font-medium border-b border-black pb-1 hover:text-gray-600">
              VIEW ALL
            </Link>
          </div>

          {/* We will replace these placeholders with Real DB Data in the next step */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="overflow-hidden bg-gray-100 aspect-[3/4] mb-4">
                  <img 
                    src={`https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&auto=format&fit=crop&q=80`}
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