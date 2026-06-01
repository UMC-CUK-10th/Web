// store/cartStore.ts
import { create } from 'zustand'
import cartItems from './constants/cartItems'

interface CartItem {
  id: string
  title: string
  singer: string
  price: string
  img: string
  amount: number
  stock: number
}

interface CartStore {
  // 상태
  items: CartItem[]
  isModalOpen: boolean

  // 액션
  increase: (id: string) => void
  decrease: (id: string) => void
  removeItem: (id: string) => void
  clearAll: () => void
  openModal: () => void
  closeModal: () => void
}

const useCartStore = create<CartStore>((set) => ({
  // 초기 상태
  items: cartItems.map((item) => ({
    ...item,
    stock: item.amount,
    amount: 0,
  })),
  isModalOpen: false,

  // 액션
  increase: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id && item.amount < item.stock
          ? { ...item, amount: item.amount + 1 }
          : item
      ),
    })),

  decrease: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id && item.amount > 0
          ? { ...item, amount: item.amount - 1 }
          : item
      ),
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, amount: 0 } : item
      ),
    })),

  clearAll: () =>
    set((state) => ({
      items: state.items.map((item) => ({ ...item, amount: 0 })),
    })),

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}))

export default useCartStore