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
    default: "LEHER | Tanvi Bansal",
    template: "%s | LEHER",
  },
  description:
    "Murals, live art experiences, corporate workshops, wedding installations, and commissioned paintings by LEHER.",
  keywords: [
    "LEHER",
    "Tanvi Bansal",
    "art portfolio",
    "visual artist",
    "art gallery",
    "art workshops",
    "murals",
    "original paintings",
  ],
  openGraph: {
    title: "LEHER | Tanvi Bansal",
    description:
      "Murals, live art experiences, corporate workshops, wedding installations, and commissioned paintings.",
    url: siteUrl,
    siteName: "LEHER",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LEHER | Tanvi Bansal",
    description:
      "Murals, live art experiences, corporate workshops, wedding installations, and commissioned paintings.",
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
