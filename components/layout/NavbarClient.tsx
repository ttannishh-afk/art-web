"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hexagon, Menu, X, LogOut, LayoutDashboard, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLoginModal from "@/components/layout/AdminLoginModal";
import { useAccentStore } from "@/hooks/use-accent";

interface NavbarClientProps {
  isAdmin: boolean;
}

export default function NavbarClient({ isAdmin }: NavbarClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverAdmin, setHoverAdmin] = useState(false);
  const [hoverConnect, setHoverConnect] = useState(false);
  const pathname = usePathname();
  const isBlue = useAccentStore((s) => s.isBlue);
  const accentColor = isBlue ? "#2563eb" : "#e11d48"; // blue-600 or rose-600

  const navLinks = [
    { href: "/murals-spatial-art", label: "Murals & Spatial Art" },
    { href: "/corporate-art-experiences", label: "Corporate Art Experiences" },
    { href: "/weddings-private-events", label: "Weddings & Private Events" },
    { href: "/commissioned-canvases", label: "Commissioned Canvases" },
  ];

  const getLinkClass = (path: string) =>
    pathname === path
      ? "text-xs font-bold text-black border-b-2 border-black pb-1 transition-all uppercase tracking-[0.16em]"
      : "text-xs font-medium text-gray-500 hover:text-black transition-colors pb-1 border-b-2 border-transparent uppercase tracking-[0.16em]";

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);

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
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isNavVisible || isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
            : "bg-white/90 backdrop-blur-md border-b border-gray-100"
        }`}
      >
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

            {/* DESKTOP NAV LINKS */}
            <div className="hidden xl:flex items-center justify-center gap-7">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={getLinkClass(link.href)}>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* RIGHT SIDE CTA */}
            <div className="flex items-center justify-end gap-3">

              {isAdmin ? (
                /* ── ADMIN IS LOGGED IN ── */
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest border px-3 py-1.5 rounded-full transition-all duration-200"
                    style={{
                      color: accentColor,
                      borderColor: hoverAdmin ? accentColor : `${accentColor}50`,
                      backgroundColor: hoverAdmin ? accentColor : "transparent",
                    }}
                    onMouseEnter={() => setHoverAdmin(true)}
                    onMouseLeave={() => setHoverAdmin(false)}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" style={{ color: hoverAdmin ? "white" : accentColor }} />
                    <span style={{ color: hoverAdmin ? "white" : accentColor }}>Admin</span>
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-black hover:bg-zinc-100 border border-zinc-200 hover:border-zinc-400 px-3 py-1.5 rounded-full transition-all duration-200"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Log out
                  </button>
                </div>
              ) : (
                /* ── NOT LOGGED IN ── */
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() => setIsAdminModalOpen(true)}
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest border px-3 py-1.5 rounded-full transition-all duration-200"
                    style={{
                      color: hoverAdmin ? "#09090b" : "#71717a",
                      borderColor: hoverAdmin ? "#09090b" : "#e4e4e7",
                    }}
                    onMouseEnter={() => setHoverAdmin(true)}
                    onMouseLeave={() => setHoverAdmin(false)}
                  >
                    <Shield
                      className="w-3.5 h-3.5 transition-colors"
                      style={{ color: hoverAdmin ? accentColor : "#71717a" }}
                    />
                    Are you an admin?
                  </button>
                  <Link
                    href="/contact"
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: hoverConnect ? accentColor : "#09090b",
                      color: "white",
                    }}
                    onMouseEnter={() => setHoverConnect(true)}
                    onMouseLeave={() => setHoverConnect(false)}
                  >
                    Let&apos;s Connect
                  </Link>
                </div>
              )}

              {/* MOBILE HAMBURGER */}
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
            {/* Nav links */}
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

            {/* Mobile CTAs */}
            <div className="pt-2 flex flex-col gap-4">
              {isAdmin ? (
                <>
                  <Link
                    href="/admin"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2 text-rose-600 font-bold uppercase tracking-widest text-sm"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={() => { closeMobileMenu(); signOut({ callbackUrl: "/" }); }}
                    className="flex items-center gap-2 text-zinc-500 font-bold uppercase tracking-widest text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { closeMobileMenu(); setIsAdminModalOpen(true); }}
                    className="flex items-center gap-2 text-zinc-500 font-bold uppercase tracking-widest text-sm"
                  >
                    <Shield className="w-4 h-4" />
                    Are you an admin?
                  </button>
                  <Link
                    href="/contact"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2 text-black font-bold uppercase tracking-widest text-sm"
                  >
                    Let&apos;s Connect →
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADMIN LOGIN MODAL — key forces remount/reset when reopened */}
      <AdminLoginModal
        key={isAdminModalOpen ? "open" : "closed"}
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </>
  );
}
