"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { MouseEventHandler } from "react";

interface AddToCartButtonProps {
  data: {
    id: string;
    title: string;
    price: string;
    image: string;
  };
  disabled?: boolean;
}

export function AddToCartButton({ data, disabled }: AddToCartButtonProps) {
  const cart = useCart();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  return (
    <button
      onClick={onAddToCart}
      disabled={disabled}
      className="mt-8 w-full bg-black text-white py-4 px-8 flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
    >
      <ShoppingBag className="h-5 w-5" />
      <span className="font-medium tracking-wide">
        {disabled ? "SOLD OUT" : "ADD TO CART"}
      </span>
    </button>
  );
}