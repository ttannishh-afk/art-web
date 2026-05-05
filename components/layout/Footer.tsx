"use client";

import Link from "next/link";
import { Hexagon, Instagram, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-black text-white p-1 rounded-md">
                <Hexagon className="h-4 w-4 fill-current" /> 
              </div>
              <span className="font-serif text-xl tracking-tight font-bold">LEHER</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Murals, live art experiences, workshops, and commissioned paintings for spaces and
              celebrations that deserve to feel alive.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="font-bold mb-4 text-sm tracking-widest uppercase">Explore</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/shop" className="hover:text-black transition-colors">Shop All</Link></li>
              <li><Link href="/gallery" className="hover:text-black transition-colors">Gallery</Link></li>
              <li><Link href="/about" className="hover:text-black transition-colors">About the Artist</Link></li>
              <li><Link href="/contact" className="hover:text-black transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h3 className="font-bold mb-4 text-sm tracking-widest uppercase">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="bg-white p-2 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="bg-white p-2 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="mailto:hello@tanishgupta.com" className="bg-white p-2 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} LEHER. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-black">Privacy Policy</Link>
            <Link href="#" className="hover:text-black">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
