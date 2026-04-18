import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer"; 
import { AuthProvider } from "@/components/providers/AuthProvider"; 
import { AuthModalProvider } from "@/components/providers/AuthModalProvider"; 
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteUrl } from "@/lib/env";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tanish Gupta | Visual Artist",
    template: "%s | Tanish Gupta",
  },
  description:
    "Portfolio, gallery, and studio shop for Tanish Gupta, featuring original artworks, workshops, murals, and creative wellness experiences.",
  keywords: [
    "Tanish Gupta",
    "art portfolio",
    "visual artist",
    "art gallery",
    "art workshops",
    "murals",
    "original paintings",
  ],
  openGraph: {
    title: "Tanish Gupta | Visual Artist",
    description:
      "Portfolio, gallery, and studio shop for original artworks, workshops, murals, and creative wellness experiences.",
    url: siteUrl,
    siteName: "Tanish Gupta",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanish Gupta | Visual Artist",
    description:
      "Portfolio, gallery, and studio shop for original artworks, workshops, murals, and creative wellness experiences.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <SmoothScrollProvider>
          <AuthProvider>
            <AuthModalProvider>
              <Navbar />
              <main className="min-h-screen"> 
                {children}
              </main>
              <Footer />
              <SpeedInsights />
            </AuthModalProvider>
          </AuthProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
