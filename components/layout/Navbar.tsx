"use client";

import Link from "next/link";
import { ShoppingBag, User, Hexagon } from "lucide-react"; // Added Hexagon for logo
import { useCart } from "@/hooks/use-cart";
import { useEffect, useState } from "react";

export function Navbar() {
  const cart = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-2">
             {/* Logo Placeholder */}
            <div className="bg-black text-white p-1 rounded-md">
              <Hexagon className="h-6 w-6 fill-current" /> 
            </div>
            <Link href="/" className="font-serif text-2xl tracking-tighter text-black">
              TANISH GUPTA
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/gallery" className="text-sm font-medium text-gray-900 hover:text-gray-500">
              GALLERY
            </Link>
            <Link href="/shop" className="text-sm font-medium text-gray-900 hover:text-gray-500">
              SHOP
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-900 hover:text-gray-500">
              ABOUT
            </Link>
            {/* New Contact Tab */}
            <Link href="/contact" className="text-sm font-medium text-gray-900 hover:text-gray-500">
              CONTACT US
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/cart" className="relative group">
              <ShoppingBag className="h-5 w-5 text-gray-700 group-hover:text-black transition-colors" />
              {isMounted && cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cart.items.length}
                </span>
              )}
            </Link>
            <Link href="/login">
              <User className="h-5 w-5 text-gray-700 hover:text-black transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}