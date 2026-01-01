"use client";

import { useTransition } from "react";
import { addToCart } from "@/app/actions"; 
import { Loader2, Check } from "lucide-react";
import { useSession } from "next-auth/react"; // 👈 Get session status
import { useAuthModal } from "@/components/providers/AuthModalProvider"; // 👈 Get global modal trigger

interface AddToCartButtonProps {
  isInCart?: boolean;
  data: {
    id: string;
    title: string;
    price: string;
    image: string;
    maxStock: number;
  };
}

export default function AddToCartButton({ data, isInCart = false }: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession(); // 1. Check if user is logged in
  const { openAuthModal } = useAuthModal(); // 2. Function to open the popup

  const handleAdd = () => {
    // If already in cart, do nothing (button is technically disabled anyway, but safety first)
    if (isInCart) return;

    // 3. If NOT logged in, open the popup and stop here
    if (!session) {
      openAuthModal();
      return;
    }

    // 4. If logged in, proceed to server action
    startTransition(async () => {
      await addToCart(data.id);
    });
  };

  return (
    <div className="w-full">
      <button
        onClick={handleAdd}
        // Disable if pending, no stock, OR already in cart
        disabled={isPending || data.maxStock <= 0 || isInCart}
        className={`w-full py-4 font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2
          ${isInCart 
            ? "bg-gray-100 text-gray-500 cursor-default border border-gray-200" 
            : "bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          }
        `}
      >
        {isPending ? (
          <>
            <Loader2 className="animate-spin w-4 h-4" />
            ADDING...
          </>
        ) : isInCart ? (
          <>
            <Check className="w-4 h-4" />
            IN CART
          </>
        ) : (
          "ADD TO CART"
        )}
      </button>

      {/* Helper Message */}
      {isInCart && (
        <p className="text-center text-xs text-gray-500 mt-3">
          This item is in your cart. You can adjust the quantity in the <a href="/cart" className="underline text-black">cart page</a>.
        </p>
      )}
    </div>
  );
}