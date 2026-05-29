import { create } from 'zustand';
import cartItems from '../constants/cartItems';
import type { CartItems } from '../types/cart';

type CartTotals = {
  amount: number;
  total: number;
};

type CartStore = {
  cartItems: CartItems;
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
};

const getTotals = (items: CartItems): CartTotals =>
  items.reduce(
    (acc, item) => {
      acc.amount += item.amount;
      acc.total += Number(item.price) * item.amount;
      return acc;
    },
    { amount: 0, total: 0 },
  );

const initialTotals = getTotals(cartItems);

export const useCartStore = create<CartStore>((set) => ({
  cartItems,
  amount: initialTotals.amount,
  total: initialTotals.total,
  isOpen: false,
  increase: (id) =>
    set((state) => {
      const updatedItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item,
      );

      return {
        cartItems: updatedItems,
        ...getTotals(updatedItems),
      };
    }),
  decrease: (id) =>
    set((state) => {
      const updatedItems = state.cartItems
        .map((item) => (item.id === id ? { ...item, amount: item.amount - 1 } : item))
        .filter((item) => item.amount >= 1);

      return {
        cartItems: updatedItems,
        ...getTotals(updatedItems),
      };
    }),
  removeItem: (id) =>
    set((state) => {
      const updatedItems = state.cartItems.filter((item) => item.id !== id);

      return {
        cartItems: updatedItems,
        ...getTotals(updatedItems),
      };
    }),
  clearCart: () =>
    set({
      cartItems: [],
      amount: 0,
      total: 0,
    }),
  calculateTotals: () =>
    set((state) => ({
      ...getTotals(state.cartItems),
    })),
  openModal: () =>
    set({
      isOpen: true,
    }),
  closeModal: () =>
    set({
      isOpen: false,
    }),
}));
