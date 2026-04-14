"use client";

import { useState, useTransition } from "react";
import { addToCart } from "@/app/actions"; 
import { Loader2, Check } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useAuthModal } from "@/components/providers/AuthModalProvider";

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
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const { openAuthModal } = useAuthModal();

  const handleAdd = () => {
    if (isInCart) return;
    setError(null);

    if (!session) {
      openAuthModal();
      return;
    }

    startTransition(async () => {
      const result = await addToCart(data.id);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="w-full">
      <button
        onClick={handleAdd}
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

      {isInCart && (
        <p className="text-center text-xs text-gray-500 mt-3">
          This item is in your cart. You can adjust the quantity in the{" "}
          <Link href="/cart" className="underline text-black">
            cart page
          </Link>.
        </p>
      )}

      {error && (
        <p className="text-center text-xs text-red-600 mt-3">{error}</p>
      )}
    </div>
  );
}
