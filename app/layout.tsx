import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer"; 
import { AuthProvider } from "@/components/providers/AuthProvider"; // <--- CORRECT IMPORT PATH

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});

export const metadata: Metadata = {
  title: "Tanish Gupta | Visual Artist",
  description: "Portfolio and Shop of Tanish Gupta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen"> 
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}