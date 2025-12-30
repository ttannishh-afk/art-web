import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  title: string;
  price: string;
  image: string;
  quantity?: number; // Added quantity
  maxStock?: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void; // <--- This was missing
  setItems: (items: CartItem[]) => void;
  removeAll: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: CartItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
            return;
        }

        // Default quantity 1 if not specified
        set({ items: [...get().items, { ...data, quantity: 1 }] });
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
      },
      // THIS IS THE NEW FUNCTION THAT WAS MISSING
      updateQuantity: (id: string, quantity: number) => {
        const currentItems = get().items;
        const updatedItems = currentItems.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: quantity };
            }
            return item;
        });
        set({ items: updatedItems });
      },
      setItems: (items: CartItem[]) => set({ items }),
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);