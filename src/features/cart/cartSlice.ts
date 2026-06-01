import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import cartItems from '../../constants/cartItems'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: cartItems.map((item) => ({
      ...item,
      stock: item.amount,  // 재고
      amount: 0,           // 장바구니 수량 (0으로 초기화)
    })),
  },
  reducers: {
    increase: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload)
      if (item && item.amount < item.stock) {
        item.amount += 1
      }
    },
    decrease: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload)
      if (item && item.amount > 0) {
        item.amount -= 1
      }
    },
    clearAll: (state) => {
      state.items.forEach((item) => { item.amount = 0 })
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload)
      if (item) item.amount = 0
    },
  },
})

export const { increase, decrease, clearAll, removeItem } = cartSlice.actions
export default cartSlice.reducer