"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Building2, Hexagon, Home, Menu, X, LogOut, LayoutDashboard, Shield } from "lucide-react";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLoginModal from "@/components/layout/AdminLoginModal";
import { useAccentStore } from "@/hooks/use-accent";

interface NavbarClientProps {
  isAdmin: boolean;
}

export default function NavbarClient({ isAdmin }: NavbarClientProps) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverAdmin, setHoverAdmin] = useState(false);
  const [hoverConnect, setHoverConnect] = useState(false);
  const [navTransition, setNavTransition] = useState<{
    x: number;
    y: number;
    color: string;
  } | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isBlue = useAccentStore((s) => s.isBlue);
  const accentColor = isBlue ? "#2563eb" : "#e11d48"; // blue-600 or rose-600

  const navLinks = [
    { href: "/murals-spatial-art", label: "Murals & Spatial Art" },
    { href: "/corporate-art-experiences", label: "Corporate Art Experiences" },
    { href: "/weddings-private-events", label: "Weddings & Private Events" },
    { href: "/commissioned-canvases", label: "Commissioned Canvases" },
  ];

  const muralJourneys = [
    {
      href: "/murals-spatial-art/corporate",
      label: "Corporate & Commercial",
      description: "Offices, boardrooms, cafes, retail, restaurants",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=900",
      icon: Building2,
      tone: "text-blue-600",
    },
    {
      href: "/murals-spatial-art/residential",
      label: "Residential",
      description: "Homes, apartments, personal spaces",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=900",
      icon: Home,
      tone: "text-rose-600",
    },
  ];

  const isMuralPage = pathname.startsWith("/murals-spatial-art");
  const navHoverColor = isMuralPage ? "#fcd34d" : accentColor;
  const navHoverTextColor = isMuralPage ? "#09090b" : "white";
  const cursorColor = isMuralPage ? "#fcd34d" : accentColor;

  const getLinkClass = (path: string) =>
    pathname === path || (path === "/murals-spatial-art" && pathname.startsWith("/murals-spatial-art/"))
      ? "inline-flex h-16 items-center border-b-2 border-black text-xs font-bold uppercase tracking-[0.16em] text-black transition-all"
      : "inline-flex h-16 items-center border-b-2 border-transparent text-xs font-medium uppercase tracking-[0.16em] text-gray-500 transition-colors hover:text-black";

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const startPageTransition = (
    event: MouseEvent<HTMLElement>,
    href: string,
    color = navHoverColor,
  ) => {
    if (href === pathname) return;

    event.preventDefault();
    closeMobileMenu();

    const rect = event.currentTarget.getBoundingClientRect();
    setNavTransition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      color,
    });

    window.setTimeout(() => router.push(href), 620);
    window.setTimeout(() => setNavTransition(null), 980);
  };

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

  useEffect(() => {
    if (pathname === "/") return;

    let trailX = window.innerWidth / 2;
    let trailY = window.innerHeight / 2;
    let mouseX = trailX;
    let mouseY = trailY;
    let frame = 0;

    const onMouseMove = (event: globalThis.MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX - 5}px, ${mouseY - 5}px, 0)`;
      }
    };

    const tick = () => {
      trailX += (mouseX - trailX) * 0.16;
      trailY += (mouseY - trailY) * 0.16;
      if (cursorTrailRef.current) {
        cursorTrailRef.current.style.transform = `translate3d(${trailX - 20}px, ${trailY - 20}px, 0)`;
      }
      frame = window.requestAnimationFrame(tick);
    };

    document.documentElement.classList.add("md:cursor-none");
    window.addEventListener("mousemove", onMouseMove);
    frame = window.requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("md:cursor-none");
      window.removeEventListener("mousemove", onMouseMove);
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <>
      <AnimatePresence>
        {navTransition && (
          <motion.div
            initial={{ scale: 0, opacity: 1, x: "-50%", y: "-50%" }}
            animate={{ scale: 90, opacity: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
            className="fixed z-[180] h-10 w-10 rounded-full pointer-events-none"
            style={{
              left: navTransition.x,
              top: navTransition.y,
              backgroundColor: navTransition.color,
            }}
          />
        )}
      </AnimatePresence>

      {pathname !== "/" && (
        <>
          <div
            ref={cursorTrailRef}
            className="pointer-events-none fixed left-0 top-0 z-[170] hidden h-10 w-10 rounded-full border-2 opacity-60 md:block"
            style={{ borderColor: cursorColor }}
          />
          <div
            ref={cursorRef}
            className="pointer-events-none fixed left-0 top-0 z-[171] hidden h-2.5 w-2.5 rounded-full md:block"
            style={{ backgroundColor: cursorColor }}
          />
        </>
      )}

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
          <div className="grid h-16 grid-cols-[1fr_auto] items-center gap-4 xl:grid-cols-[1fr_minmax(620px,2fr)_1fr]">

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
              {navLinks.map((link) => {
                if (link.href === "/murals-spatial-art") {
                  return (
                    <div key={link.href} className="group relative flex h-16 items-center">
                      <Link
                        href={link.href}
                        onClick={(event) => startPageTransition(event, link.href, "#fcd34d")}
                        className={getLinkClass(link.href)}
                      >
                        <span className="transition-colors group-hover:text-amber-700">
                          {link.label}
                        </span>
                      </Link>
                      <div className="invisible absolute left-1/2 top-full z-50 mt-1 w-[720px] -translate-x-1/2 translate-y-3 rounded-3xl border border-zinc-100 bg-white p-4 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-400">
                          Choose a wall journey
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {muralJourneys.map((journey) => (
                            <Link
                              key={journey.href}
                              href={journey.href}
                              onClick={(event) => startPageTransition(event, journey.href, "#fcd34d")}
                              className="group/journey relative min-h-56 overflow-hidden rounded-2xl bg-zinc-950 p-5 text-white"
                            >
                              <Image
                                src={journey.image}
                                alt=""
                                fill
                                sizes="360px"
                                className="object-cover opacity-65 transition duration-700 group-hover/journey:scale-105 group-hover/journey:opacity-50"
                              />
                              <span className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                              <span className={`relative mb-12 flex h-10 w-10 items-center justify-center rounded-full bg-white ${journey.tone}`}>
                                <journey.icon className="h-4 w-4" />
                              </span>
                              <span className="relative mt-auto block">
                                <span className="block font-serif text-2xl leading-tight text-white">
                                  {journey.label}
                                </span>
                                <span className="mt-2 block text-xs font-medium leading-relaxed text-white/70">
                                  {journey.description}
                                </span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(event) => startPageTransition(event, link.href)}
                    className={getLinkClass(link.href)}
                  >
                    {link.label}
                  </Link>
                );
              })}
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
                      borderColor: hoverAdmin ? navHoverColor : `${accentColor}50`,
                      backgroundColor: hoverAdmin ? navHoverColor : "transparent",
                    }}
                    onMouseEnter={() => setHoverAdmin(true)}
                    onMouseLeave={() => setHoverAdmin(false)}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" style={{ color: hoverAdmin ? navHoverTextColor : accentColor }} />
                    <span style={{ color: hoverAdmin ? navHoverTextColor : accentColor }}>Admin</span>
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
                      color: hoverAdmin ? navHoverTextColor : "#71717a",
                      borderColor: hoverAdmin ? navHoverColor : "#e4e4e7",
                      backgroundColor: hoverAdmin ? navHoverColor : "transparent",
                    }}
                    onMouseEnter={() => setHoverAdmin(true)}
                    onMouseLeave={() => setHoverAdmin(false)}
                  >
                    <Shield
                      className="w-3.5 h-3.5 transition-colors"
                      style={{ color: hoverAdmin ? navHoverTextColor : "#71717a" }}
                    />
                    Are you an admin?
                  </button>
                  <Link
                    href="/contact"
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: hoverConnect ? navHoverColor : "#09090b",
                      color: hoverConnect && isMuralPage ? "#09090b" : "white",
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
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="text-2xl font-serif leading-tight"
                  >
                    {link.label}
                  </Link>
                  {link.href === "/murals-spatial-art" && (
                    <div className="mt-3 grid gap-2 border-l border-zinc-200 pl-4">
                      {muralJourneys.map((journey) => (
                        <Link
                          key={journey.href}
                          href={journey.href}
                          onClick={closeMobileMenu}
                          className="text-sm font-bold uppercase tracking-widest text-zinc-500"
                        >
                          {journey.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
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
