"use client";

import { useCart } from "@/hooks/use-cart";
import { Trash2, Plus, Minus, AlertCircle } from "lucide-react"; // Added AlertIcon
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const cart = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const total = cart.items.reduce((sum, item) => {
    return sum + (Number(item.price) * (item.quantity || 1));
  }, 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();

      if (res.ok) {
        cart.removeAll(); 
        router.push("/success");
      } else {
        alert("Checkout Failed: " + data.error);
      }
    } catch (error) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const changeQty = async (id: string, currentQty: number, delta: number, maxStock: number) => {
    const newQty = currentQty + delta;
    
    // Check Lower Limit (1)
    if (newQty < 1) return; 
    
    // Check Upper Limit (Stock)
    if (newQty > maxStock) return; 

    // 1. Update UI
    cart.updateQuantity(id, newQty);

    // 2. Sync DB
    try {
      await fetch("/api/cart", {
        method: "PUT",
        body: JSON.stringify({ productId: id, quantity: newQty }),
      });
    } catch (error) {
      console.error("Failed to sync quantity", error);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-3xl font-serif mb-4">Your Cart is Empty</h1>
        <Link href="/shop" className="text-gray-500 underline hover:text-black">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            {cart.items.map((item) => {
              // Helper boolean: Have we hit the limit?
              const isMaxedOut = (item.quantity || 1) >= (item.maxStock || 99);
              
              return (
              <div key={item.id} className="flex gap-6 py-6 border-b border-gray-100">
                <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg">{item.title}</h3>
                    <p className="text-gray-500 text-sm">$ {Number(item.price).toFixed(2)}</p>
                    
                    {/* Show Warning if stock is low or maxed */}
                    {isMaxedOut && (
                        <div className="flex items-center gap-1 text-xs text-amber-600 mt-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>Max stock reached ({item.maxStock})</span>
                        </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 gap-4">
                        <button 
                            onClick={() => changeQty(item.id, item.quantity || 1, -1, item.maxStock || 99)}
                            className="text-gray-500 hover:text-black disabled:opacity-30"
                            disabled={(item.quantity || 1) <= 1}
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        
                        <span className="text-sm font-medium w-2 text-center">{item.quantity || 1}</span>
                        
                        <button 
                            onClick={() => changeQty(item.id, item.quantity || 1, 1, item.maxStock || 99)}
                            className="text-gray-500 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
                            // DISABLE IF MAXED OUT
                            disabled={isMaxedOut}
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>
                    
                    <button 
                        onClick={() => {
                            fetch("/api/cart", { method: "PUT", body: JSON.stringify({ productId: item.id, quantity: 0 })})
                            cart.removeItem(item.id)
                        }}
                        className="text-gray-400 hover:text-red-500 text-sm underline ml-auto"
                    >
                        Remove
                    </button>
                  </div>
                </div>
              </div>
            )})}
          </div>

          <div className="bg-gray-50 p-8 h-fit rounded-lg">
            <h2 className="font-serif text-xl mb-6">Order Summary</h2>
            <div className="flex justify-between mb-8 text-lg font-bold">
              <span>Total</span>
              <span>$ {total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-black text-white py-4 font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? "PROCESSING..." : "CONFIRM ORDER"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}