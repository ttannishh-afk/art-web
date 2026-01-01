"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Hexagon, Menu, X } from "lucide-react"; // 👈 Added Menu, X
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AuthModal from "@/components/auth/AuthModal";
import { motion, AnimatePresence } from "framer-motion"; // 👈 For smooth mobile animation

interface NavbarClientProps {
  cartCount: number;
  isAdmin: boolean;
}

export default function NavbarClient({ cartCount, isAdmin }: NavbarClientProps) {
  const { data: session } = useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 👈 Mobile State
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const getLinkClass = (path: string) => {
    return pathname === path 
      ? "text-sm font-bold text-black border-b-2 border-black pb-1 transition-all" 
      : "text-sm font-medium text-gray-500 hover:text-black transition-colors pb-1 border-b-2 border-transparent";
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="w-full px-6 md:px-10">
          <div className="flex justify-between items-center h-16">
            
            {/* === LEFT: LOGO === */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="bg-black text-white p-1.5 rounded-md flex items-center justify-center">
                <Hexagon className="h-5 w-5 fill-current" /> 
              </div>
              <Link href="/" className="font-serif text-2xl tracking-tighter text-black leading-none pt-1">
                TANISH GUPTA
              </Link>
            </div>

            {/* === CENTER: DESKTOP NAV === */}
            <div className="hidden lg:flex space-x-6">
              <Link href="/" className={getLinkClass("/")}>HOME</Link>
              <Link href="/for-work" className={getLinkClass("/for-work")}>FOR WORK</Link>
              <Link href="/for-self" className={getLinkClass("/for-self")}>FOR SELF</Link>
              <Link href="/about" className={getLinkClass("/about")}>ABOUT</Link>
              <Link href="/impact" className={getLinkClass("/impact")}>IMPACT</Link>
              <Link href="/gallery" className={getLinkClass("/gallery")}>GALLERY</Link>
              <Link href="/shop" className={getLinkClass("/shop")}>SHOP</Link>
              
              {isAdmin && (
                <Link href="/admin" className={`text-red-600 hover:text-red-800 ${getLinkClass("/admin")}`}>
                  ADMIN
                </Link>
              )}
            </div>

            {/* === RIGHT: ICONS & HAMBURGER === */}
            <div className="flex items-center space-x-5">
              
              {/* CART */}
              <Link href="/cart" className={`relative group ${pathname === "/cart" ? "text-black" : "text-gray-700"}`}>
                <ShoppingBag className="h-5 w-5 group-hover:text-black transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* USER */}
              {session ? (
                <Link href="/profile" className={`hidden md:block text-gray-700 hover:text-black transition-colors ${pathname === "/profile" ? "text-black" : ""}`}>
                  <User className="h-5 w-5" />
                </Link>
              ) : (
                <button onClick={() => setShowAuthModal(true)} className="hidden md:block text-gray-700 hover:text-black transition-colors">
                   <User className="h-5 w-5" />
                </button>
              )}

              {/* MOBILE MENU TOGGLE (Visible on small screens) */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="lg:hidden text-black focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* === MOBILE MENU OVERLAY === */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 z-40 bg-white lg:hidden flex flex-col p-6 space-y-6 overflow-y-auto"
          >
            <div className="flex flex-col space-y-4 border-b border-gray-100 pb-6">
               <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Experiences</span>
               <Link href="/for-work" className="text-2xl font-serif">For Work</Link>
               <Link href="/for-self" className="text-2xl font-serif">For Self</Link>
            </div>

            <div className="flex flex-col space-y-4 border-b border-gray-100 pb-6">
               <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Discover</span>
               <Link href="/about" className="text-xl font-medium text-gray-600">About Us</Link>
               <Link href="/impact" className="text-xl font-medium text-gray-600">Our Impact</Link>
               <Link href="/gallery" className="text-xl font-medium text-gray-600">Gallery</Link>
               <Link href="/shop" className="text-xl font-medium text-gray-600">Shop Art</Link>
            </div>

            {/* Mobile User Actions */}
            <div className="pt-2">
              {session ? (
                 <Link href="/profile" className="flex items-center gap-3 text-lg font-medium">
                    <User className="w-5 h-5" /> My Profile
                 </Link>
              ) : (
                 <button onClick={() => setShowAuthModal(true)} className="flex items-center gap-3 text-lg font-medium">
                    <User className="w-5 h-5" /> Login / Join
                 </button>
              )}
            </div>

            {isAdmin && (
               <Link href="/admin" className="text-red-600 font-bold uppercase tracking-widest text-sm pt-4">
                  Admin Dashboard
               </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}