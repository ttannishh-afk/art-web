"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/hooks/use-cart";

export default function SuccessPage() {
  const cart = useCart();

  // Clear the cart when the user lands here
  useEffect(() => {
    cart.removeAll();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white text-center px-4">
      <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      
      <h1 className="font-serif text-4xl text-black mb-4">
        Order Confirmed!
      </h1>
      <p className="text-gray-500 max-w-md mb-8">
        Thank you for your purchase. We have received your order and are preparing your artwork for shipment.
      </p>

      <div className="flex gap-4">
        <Link 
          href="/shop" 
          className="px-8 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </Link>
        <Link 
          href="/" 
          className="px-8 py-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}