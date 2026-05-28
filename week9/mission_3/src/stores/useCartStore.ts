import { create } from "zustand";

import cartItems from "../constants/cartItems";

import type { CartItem } from "../types/cart";

interface CartState {
  cartItems: CartItem[];

  amount: number;

  total: number;

  isOpen: boolean;

  increase: (id: string) => void;

  decrease: (id: string) => void;

  removeItem: (id: string) => void;

  clearCart: () => void;

  calculateTotals: () => void;

  openModal: () => void;

  closeModal: () => void;
}

export const useCartStore =
  create<CartState>((set) => ({
    cartItems,

    amount: 0,

    total: 0,

    isOpen: false,

    increase: (id) =>
      set((state) => ({
        cartItems: state.cartItems.map(
          (item) =>
            item.id === id
              ? {
                  ...item,
                  amount: item.amount + 1,
                }
              : item
        ),
      })),

    decrease: (id) =>
      set((state) => ({
        cartItems: state.cartItems
          .map((item) =>
            item.id === id
              ? {
                  ...item,
                  amount: item.amount - 1,
                }
              : item
          )
          .filter((item) => item.amount > 0),
      })),

    removeItem: (id) =>
      set((state) => ({
        cartItems: state.cartItems.filter(
          (item) => item.id !== id
        ),
      })),

    clearCart: () =>
      set({
        cartItems: [],
        amount: 0,
        total: 0,
      }),

    calculateTotals: () =>
      set((state) => {
        let total = 0;
        let amount = 0;

        state.cartItems.forEach((item) => {
          total +=
            Number(item.price) *
            item.amount;

          amount += item.amount;
        });

        return {
          total,
          amount,
        };
      }),

    openModal: () =>
      set({
        isOpen: true,
      }),

    closeModal: () =>
      set({
        isOpen: false,
      }),
  }));