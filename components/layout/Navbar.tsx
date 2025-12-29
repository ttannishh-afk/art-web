"use client";

import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import { useCart } from "@/hooks/use-cart"; // <--- Import hook
import { useEffect, useState } from "react";

export function Navbar() {
  // Access the cart store
  const cart = useCart();
  
  // Hydration fix (Wait for client load before showing number)
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="font-serif text-2xl tracking-tighter text-black">
              TANISH GUPTA
            </Link>
          </div>

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
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/cart" className="relative group">
              <ShoppingBag className="h-5 w-5 text-gray-700 group-hover:text-black transition-colors" />
              
              {/* Dynamic Badge */}
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