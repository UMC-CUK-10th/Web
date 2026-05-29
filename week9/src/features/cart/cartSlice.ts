import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import cartItems from '../../constants/cartItems';
import type { CartState } from '../../types/cart';

const calculateCartTotals = (state: CartState) => {
  const { amount, total } = state.cartItems.reduce(
    (acc, item) => {
      acc.amount += item.amount;
      acc.total += Number(item.price) * item.amount;
      return acc;
    },
    { amount: 0, total: 0 },
  );

  state.amount = amount;
  state.total = total;
};

const initialState: CartState = {
  cartItems,
  amount: 0,
  total: 0,
};

calculateCartTotals(initialState);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increase: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((cartItem) => cartItem.id === action.payload);

      if (item) {
        item.amount += 1;
      }

      calculateCartTotals(state);
    },
    decrease: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((cartItem) => cartItem.id === action.payload);

      if (!item) {
        return;
      }

      item.amount -= 1;

      if (item.amount < 1) {
        state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== action.payload);
      }

      calculateCartTotals(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      calculateCartTotals(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },
    calculateTotals: (state) => {
      calculateCartTotals(state);
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;
