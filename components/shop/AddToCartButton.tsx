"use client";

import { ShoppingBag, Check } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import AuthModal from "@/components/auth/AuthModal";
import { useCart } from "@/hooks/use-cart";

export default function AddToCartButton({ data }: { data: any }) {
  const { data: session, status } = useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const cart = useCart();
  const [loading, setLoading] = useState(false);
  
  // 1. Check if item is already in cart
  // We look through the list of items in our global store
  const isInCart = cart.items.some((item) => item.id === data.id);

  useEffect(() => {
    // Sync Cart on Login (Runs once when session loads)
    if (session) {
      fetch("/api/cart")
        .then((res) => res.json())
        .then((items) => {
           if(Array.isArray(items)) cart.setItems(items);
        });
    }
  }, [session]);

  const handleAddToCart = async () => {
    // Double check to prevent forced clicks
    if (isInCart) return;

    if (status === "unauthenticated" || !session) {
      setShowAuthModal(true);
      return;
    }

    setLoading(true);
    
    try {
        const res = await fetch("/api/cart", {
          method: "POST",
          body: JSON.stringify({ productId: data.id }),
        });

        if (res.ok) {
            cart.addItem(data);
            // No need for alert, the button will simply change state
        } else {
            const err = await res.json();
            // Optional: Show alert if backend says "Already in cart" (safety net)
            if (err.message === "Item already in cart") {
                alert("This item is already in your cart.");
            } else {
                alert("Failed to add item.");
            }
        }
    } catch (error) {
        console.error("Network Error:", error);
    }
    
    setLoading(false);
  };

  return (
    <>
      <button 
        onClick={handleAddToCart}
        // 2. Disable button if loading OR if item is already in cart
        disabled={loading || isInCart}
        className={`w-full py-4 flex items-center justify-center gap-2 transition-all duration-200 
          ${isInCart 
            ? "bg-gray-100 text-gray-500 cursor-default" // Style for "In Cart"
            : "bg-black text-white hover:bg-gray-800 disabled:opacity-50" // Style for active
          }`}
      >
        {/* 3. Change Icon and Text based on state */}
        {isInCart ? (
          <>
            <Check className="w-5 h-5" />
            IN CART
          </>
        ) : (
          <>
            <ShoppingBag className="w-5 h-5" />
            {loading ? "ADDING..." : "ADD TO CART"}
          </>
        )}
      </button>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}