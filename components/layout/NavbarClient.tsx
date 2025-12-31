"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Hexagon } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import AuthModal from "@/components/auth/AuthModal";

interface NavbarClientProps {
  cartCount: number;
  isAdmin: boolean; // 👈 New Prop
}

export default function NavbarClient({ cartCount, isAdmin }: NavbarClientProps) {
  const { data: session } = useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    return pathname === path 
      ? "text-sm font-bold text-black border-b-2 border-black pb-1 transition-all" 
      : "text-sm font-medium text-gray-500 hover:text-black transition-colors pb-1 border-b-2 border-transparent";
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="w-full px-6 md:px-10">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="bg-black text-white p-1.5 rounded-md flex items-center justify-center">
                <Hexagon className="h-5 w-5 fill-current" /> 
              </div>
              <Link href="/" className="font-serif text-2xl tracking-tighter text-black leading-none pt-1">
                TANISH GUPTA
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8">
              <Link href="/" className={getLinkClass("/")}>HOME</Link>
              <Link href="/gallery" className={getLinkClass("/gallery")}>GALLERY</Link>
              <Link href="/shop" className={getLinkClass("/shop")}>SHOP</Link>
              <Link href="/about" className={getLinkClass("/about")}>ABOUT</Link>
              <Link href="/contact" className={getLinkClass("/contact")}>CONTACT US</Link>
              
              {/* 👇 ADMIN TAB (Only shows if isAdmin is true) */}
              {isAdmin && (
                <Link href="/admin" className={`text-red-600 hover:text-red-800 ${getLinkClass("/admin")}`}>
                  ADMIN CONTROL
                </Link>
              )}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-6">
              
              {/* CART ICON */}
              <Link href="/cart" className={`relative group ${pathname === "/cart" ? "text-black" : "text-gray-700"}`}>
                <ShoppingBag className="h-5 w-5 group-hover:text-black transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* USER ICON */}
              {session ? (
                <Link href="/profile" className={`text-gray-700 hover:text-black transition-colors ${pathname === "/profile" ? "text-black" : ""}`}>
                  <User className="h-5 w-5" />
                </Link>
              ) : (
                <button onClick={() => setShowAuthModal(true)} className="text-gray-700 hover:text-black transition-colors">
                   <User className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}