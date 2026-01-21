import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@prisma/client";

import { Category } from "@prisma/client";

export type CartItem = Product & {
  quantity: number;
  category?: Category | null;
};

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isCartOpen: false,
      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
              isCartOpen: true, // Open cart when adding item
            };
          }
          return {
            items: [...state.items, { ...product, quantity: 1 }],
            isCartOpen: true, // Open cart when adding item
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity < 1) {
            return {
              items: state.items.filter((item) => item.id !== productId),
            };
          }
          return {
            items: state.items.map((item) =>
              item.id === productId ? { ...item, quantity } : item,
            ),
          };
        }),
      clearCart: () => set({ items: [] }),
      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }), // Don't persist isCartOpen
    },
  ),
);

// Helper hook to maintain API compatibility and compute derived state
export const useCart = () => {
  const store = useCartStore();
  const total = store.items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );
  const itemCount = store.items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    ...store,
    total,
    itemCount,
  };
};
