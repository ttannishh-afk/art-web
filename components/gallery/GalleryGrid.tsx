"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  id: string;
  title: string;
  year: string;
  size: string;
  src: string;
  category: string; // The new field
}

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState("ALL");

  // Filter Logic
  const filteredItems = items.filter((item) => {
    if (filter === "ALL") return true;
    return item.category === filter;
  });

  const categories = [
    { id: "ALL", label: "All Works" },
    { id: "ART", label: "Fine Art" },
    { id: "MURAL", label: "Murals" },
    { id: "WORKSHOP", label: "Workshops" },
    { id: "RETREAT", label: "Retreats" },
    { id: "STORY", label: "Stories" },
  ];

  return (
    <div>
      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              filter === cat.id
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* MASONRY GRID */}
      {/* 'columns-1 md:columns-2 lg:columns-3' creates the Masonry effect */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="break-inside-avoid relative group bg-gray-100 mb-8 overflow-hidden rounded-lg"
            >
              <div
                className={`relative w-full ${
                  item.size === "tall"
                    ? "aspect-[3/4]"
                    : item.size === "wide"
                    ? "aspect-[16/9]"
                    : "aspect-square"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-6 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-1 rounded mb-3">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-2xl italic mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-300 uppercase tracking-widest">
                    {item.year}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p>No items found in this category.</p>
        </div>
      )}
    </div>
  );
}