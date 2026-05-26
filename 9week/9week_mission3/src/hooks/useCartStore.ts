import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import cartItems from "../constants/cartItems";
import type { CartItems } from "../types/cart";

interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
  isOpen: boolean;
  
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
  open: () => void;
  close: () => void;
}

export const useCartStore = create<CartState>()(
  immer((set) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    isOpen: false,

    increase: (id: string) => {
      set((state) => {
        const cartItem = state.cartItems.find((item) => item.id === id);
        if (cartItem) cartItem.amount += 1;
      });
    },
    decrease: (id: string) => {
      set((state) => {
        const cartItem = state.cartItems.find((item) => item.id === id);
        if (cartItem && cartItem.amount > 0) cartItem.amount -= 1;
      });
    },
    removeItem: (id: string) => {
      set((state) => {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      });
    },
    clearCart: () => {
      set((state) => {
        state.cartItems = [];
      });
    },
    calculateTotals: () => {
      set((state) => {
        let amount = 0;
        let total = 0;
        state.cartItems.forEach((item) => {
          amount += item.amount;
          total += item.amount * item.price;
        });
        state.amount = amount;
        state.total = total;
      });
    },
    open: () => {
      set((state) => {
        state.isOpen = true;
      });
    },
    close: () => {
      set((state) => {
        state.isOpen = false;
      });
    },
  }))
);