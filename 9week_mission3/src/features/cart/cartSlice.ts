import type { StateCreator } from 'zustand';
import type { CartItemType } from '../../types/cart';
import cartItemsData from '../../constans/cartItems';

interface CartSlice {
  cartItems: CartItemType[];
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
  getTotalAmount: () => number;
  getTotalPrice: () => number;
}

export const createCartSlice: StateCreator<CartSlice> = (set, get) => ({
  cartItems: cartItemsData as CartItemType[],

  increase: (id: string) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      ),
    })),

  decrease: (id: string) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) => (item.id === id ? { ...item, amount: item.amount - 1 } : item))
        .filter((item) => item.amount > 0),
    })),

  removeItem: (id: string) =>
    set((state) => ({ cartItems: state.cartItems.filter((item) => item.id !== id) })),

  clearAll: () => set({ cartItems: [] }),

  getTotalAmount: () => get().cartItems.reduce((acc, item) => acc + item.amount, 0),

  getTotalPrice: () =>
    get().cartItems.reduce((acc, item) => acc + Number(item.price) * item.amount, 0),
});

export type { CartSlice };
