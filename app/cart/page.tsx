"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { CartItem } from "@/components/shop/CartItem";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  const onCheckout = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productIds: cart.items.map((item) => item.id)
        }),
      });

      if (response.ok) {
        router.push("/success");
      } else {
        alert("Something went wrong.");
      }
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevent hydration error
  }

  // Calculate Total
  const totalPrice = cart.items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="font-serif text-4xl font-bold text-black mb-12">
          Shopping Cart
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
          {/* LEFT: Cart Items List */}
          <div className="lg:col-span-7">
            {cart.items.length === 0 && (
              <div className="text-neutral-500 flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-lg">
                <p className="mb-4">Your cart is empty.</p>
                <Link href="/shop" className="text-black underline underline-offset-4 font-medium">
                  Browse the Gallery
                </Link>
              </div>
            )}
            <ul>
              {cart.items.map((item) => (
                <CartItem key={item.id} data={item} />
              ))}
            </ul>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Order Summary
            </h2>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="text-base font-medium text-gray-900">Order total</div>
                <div className="text-base font-medium text-gray-900">
                  ${totalPrice.toFixed(2)}
                </div>
              </div>
            </div>

            <button
    onClick={onCheckout}
    disabled={cart.items.length === 0 || loading}
    className="w-full mt-6 bg-black text-white py-4 text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {loading ? "PROCESSING..." : "CONFIRM ORDER (SIMULATION)"}
    {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
  </button>
            
            <p className="mt-4 text-xs text-gray-500 text-center">
              Shipping & taxes calculated at checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}