import { create } from 'zustand';
import type { CartItemType } from '../types/cart';
import { createCartSlice } from '../features/cart/cartSlice';
import { createModalSlice } from '../features/modal/modalSlice';

type StoreState = CartState & ModalState;

type CartState = {
  cartItems: CartItemType[];
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
  getTotalAmount: () => number;
  getTotalPrice: () => number;
};

type ModalState = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useCartStore = create<StoreState>((set, get) => ({
  // merge cart slice and modal slice
  ...createCartSlice(set as any, get as any),
  ...createModalSlice(set as any, get as any),
}));
