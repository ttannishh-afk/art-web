"use client";

import { X } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

interface CartItemProps {
  data: {
    id: string;
    title: string;
    price: string;
    image: string;
  };
}

export function CartItem({ data }: CartItemProps) {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <li className="flex py-6 border-b border-gray-100 last:border-0">
      {/* Image */}
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-32 sm:w-32 bg-gray-100">
        <img
          src={data.image}
          alt={data.title}
          className="object-cover object-center w-full h-full"
        />
      </div>

      {/* Info */}
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <button
            onClick={onRemove}
            className="p-1 rounded-full bg-white hover:bg-black hover:text-white transition-colors border border-gray-200"
          >
            <X size={15} />
          </button>
        </div>
        
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-serif font-medium text-black">
              {data.title}
            </p>
          </div>

          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">$ {data.price}</p>
          </div>
        </div>
      </div>
    </li>
  );
}