"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Hexagon, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion"; 
import { useAuthModal } from "@/components/providers/AuthModalProvider"; 

interface NavbarClientProps {
  cartCount: number;
  isAdmin: boolean;
}

export default function NavbarClient({ cartCount, isAdmin }: NavbarClientProps) {
  const { data: session } = useSession();
  const { openAuthModal } = useAuthModal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const pathname = usePathname();

  const navLinks = [
    { href: "/murals-spatial-art", label: "Murals & Spatial Art" },
    { href: "/corporate-art-experiences", label: "Corporate Art Experiences" },
    { href: "/weddings-private-events", label: "Weddings & Private Events" },
    { href: "/commissioned-canvases", label: "Commissioned Canvases" },
  ];

  const getLinkClass = (path: string) => {
    return pathname === path 
      ? "text-xs font-bold text-black border-b-2 border-black pb-1 transition-all uppercase tracking-[0.16em]" 
      : "text-xs font-medium text-gray-500 hover:text-black transition-colors pb-1 border-b-2 border-transparent uppercase tracking-[0.16em]";
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY < 24 || currentY < lastY) {
        setIsNavVisible(true);
      } else if (currentY > lastY && currentY > 96) {
        setIsNavVisible(false);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-500 ${
        isNavVisible || isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}>
        <div className="w-full px-6 md:px-10">
          <div className="grid h-16 grid-cols-[1fr_auto] items-center gap-4 xl:grid-cols-[1fr_2fr_1fr]">
            
            {/* LOGO */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="bg-black text-white p-1.5 rounded-md flex items-center justify-center">
                <Hexagon className="h-5 w-5 fill-current" /> 
              </div>
              <Link href="/" className="font-serif text-3xl tracking-tighter text-black leading-none pt-1">
                LEHER
              </Link>
            </div>

            {/* DESKTOP NAV */}
            <div className="hidden xl:flex items-center justify-center gap-7">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={getLinkClass(link.href)}>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* ICONS */}
            <div className="flex items-center justify-end space-x-5">
              <Link href="/cart" className={`relative group ${pathname === "/cart" ? "text-black" : "text-gray-700"}`}>
                <ShoppingBag className="h-5 w-5 group-hover:text-black transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </Link>

              {session ? (
                <Link href="/profile" className={`hidden md:block text-gray-700 hover:text-black transition-colors ${pathname === "/profile" ? "text-black" : ""}`}>
                  <User className="h-5 w-5" />
                </Link>
              ) : (
                <button 
                  onClick={openAuthModal}
                  className="hidden md:block text-gray-700 hover:text-black transition-colors"
                >
                   <User className="h-5 w-5" />
                </button>
              )}

              {isAdmin && (
                <Link href="/admin" className="hidden xl:block text-xs font-bold uppercase tracking-[0.16em] text-red-600 hover:text-red-800">
                  Admin
                </Link>
              )}

              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="xl:hidden text-black focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 z-40 bg-white xl:hidden flex flex-col p-6 space-y-6 overflow-y-auto"
          >
            <div className="flex flex-col space-y-4 border-b border-gray-100 pb-6">
               <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Studio</span>
               {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="text-2xl font-serif leading-tight"
                >
                  {link.label}
                </Link>
               ))}
            </div>

            <div className="pt-2">
              {session ? (
                 <Link href="/profile" onClick={closeMobileMenu} className="flex items-center gap-3 text-lg font-medium">
                    <User className="w-5 h-5" /> My Profile
                 </Link>
              ) : (
                 <button 
                    onClick={() => {
                      closeMobileMenu();
                      openAuthModal();
                    }}
                    className="flex items-center gap-3 text-lg font-medium"
                 >
                    <User className="w-5 h-5" /> Login / Join
                 </button>
              )}
            </div>

            {isAdmin && (
               <Link href="/admin" onClick={closeMobileMenu} className="text-red-600 font-bold uppercase tracking-widest text-sm pt-4">
                  Admin Dashboard
               </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
