"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, Minus, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { getCart, updateCartItemQuantity, removeFromCart, placeOrder } from "@/app/actions";

// Match your DB structure
interface CartItem {
  id: string;        // Product ID
  cartItemId: string; // CartItem ID
  title: string;
  price: string;
  image: string;
  quantity: number;
  maxStock: number;
}

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function loadCart() {
      const data = await getCart();
      setItems(data);
      setLoading(false);
    }
    loadCart();
  }, []);

  const total = items.reduce((sum, item) => {
    return sum + (Number(item.price) * item.quantity);
  }, 0);

  const changeQty = async (productId: string, currentQty: number, delta: number, maxStock: number) => {
    const newQty = currentQty + delta;
    
    if (newQty < 1) return;
    if (newQty > maxStock) return;

    const previousItems = items;

    setItems(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: newQty } : item
    ));

    startTransition(async () => {
      const result = await updateCartItemQuantity(productId, newQty);

      if (result?.error) {
        setItems(previousItems);
        toast.error(result.error);
        router.refresh();
      }
    });
  };

  const handleRemove = (cartItemId: string) => {
    setItems(prev => prev.filter(i => i.cartItemId !== cartItemId));
    toast.success("Item removed.");
    
    startTransition(async () => {
      await removeFromCart(cartItemId);
    });
  };

  const handleCheckout = () => {
    startTransition(async () => {
      const result = await placeOrder();
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Order placed successfully!");
        router.push("/");
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8 text-gray-300" />
      </div>
    );
  }

  if (items.length === 0) {
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
          
          {/* Cart Items List */}
          <div className="md:col-span-2 space-y-8">
            {items.map((item) => {
              const isMaxedOut = item.quantity >= item.maxStock;
              
              return (
              <div key={item.id} className="flex gap-6 py-6 border-b border-gray-100">
                <div className="w-24 h-24 bg-gray-100 flex-shrink-0 relative overflow-hidden">
                   {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="eager"
                        className="object-cover"
                      />
                   )}
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg">{item.title}</h3>
                    <p className="text-gray-500 text-sm">$ {Number(item.price).toFixed(2)}</p>
                    
                    {/* Max Stock Warning */}
                    {isMaxedOut && (
                        <div className="flex items-center gap-1 text-xs text-amber-600 mt-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>Max stock reached ({item.maxStock})</span>
                        </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 mt-4">
                    {/* QUANTITY CONTROLS */}
                    <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 gap-4">
                        <button 
                            onClick={() => changeQty(item.id, item.quantity, -1, item.maxStock)}
                            className="text-gray-500 hover:text-black disabled:opacity-30"
                            disabled={item.quantity <= 1 || isPending}
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        
                        <span className="text-sm font-medium w-2 text-center">
                            {item.quantity}
                        </span>
                        
                        <button 
                            onClick={() => changeQty(item.id, item.quantity, 1, item.maxStock)}
                            className="text-gray-500 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
                            disabled={isMaxedOut || isPending}
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>
                    
                    {/* REMOVE BUTTON */}
                    <button 
                        onClick={() => handleRemove(item.cartItemId)}
                        className="text-gray-400 hover:text-red-500 text-sm underline ml-auto"
                        disabled={isPending}
                    >
                        Remove
                    </button>
                  </div>
                </div>
              </div>
            )})}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-8 h-fit rounded-lg">
            <h2 className="font-serif text-xl mb-6">Order Summary</h2>
            <div className="flex justify-between mb-8 text-lg font-bold">
              <span>Total</span>
              <span>$ {total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading || isPending}
              className="w-full bg-black text-white py-4 font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isPending ? (
                 <>
                   <Loader2 className="animate-spin w-5 h-5" /> 
                   PROCESSING...
                 </>
              ) : (
                 "CONFIRM ORDER"
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
