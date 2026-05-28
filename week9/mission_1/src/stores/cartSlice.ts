import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import cartItems from "../constants/cartItems";
import type { CartItem } from "../types/cart";

interface CartState {
  cartItems: CartItem[];
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    increase: (
      state,
      action: PayloadAction<string>
    ) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.amount += 1;
      }
    },

    decrease: (
      state,
      action: PayloadAction<string>
    ) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (!item) return;

      item.amount -= 1;

      if (item.amount < 1) {
        state.cartItems =
          state.cartItems.filter(
            (item) =>
              item.id !== action.payload
          );
      }
    },

    removeItem: (
      state,
      action: PayloadAction<string>
    ) => {
      state.cartItems =
        state.cartItems.filter(
          (item) =>
            item.id !== action.payload
        );
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },

    calculateTotals: (state) => {
      let total = 0;
      let amount = 0;

      state.cartItems.forEach((item) => {
        total +=
          Number(item.price) * item.amount;

        amount += item.amount;
      });

      state.total = total;
      state.amount = amount;
    },
  },
});

export const {
  increase,
  decrease,
  removeItem,
  clearCart,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;