import { create } from 'zustand';
import type { CartItemType } from '../types/cart';
import cartItemsData from '../constans/cartItems';

// ─── 타입 정의 ────────────────────────────────────────────────
interface CartState {
  // 장바구니 아이템 목록
  cartItems: CartItemType[];
  // 모달 열림/닫힘 상태
  isModalOpen: boolean;

  // ── 장바구니 액션 ──
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;

  // ── 합계 계산 (파생값 → 함수로 제공) ──
  getTotalAmount: () => number;
  getTotalPrice: () => number;

  // ── 모달 액션 ──
  openModal: () => void;
  closeModal: () => void;
}

// ─── Zustand 스토어 생성 ──────────────────────────────────────
export const useCartStore = create<CartState>((set, get) => ({
  // ── 초기 상태 ──
  cartItems: cartItemsData as CartItemType[],
  isModalOpen: false,

  // ── 수량 증가 ──
  increase: (id: string) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      ),
    })),

  // ── 수량 감소 (1 미만이면 자동 삭제) ──
  decrease: (id: string) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((item) => item.amount > 0),
    })),

  // ── 개별 아이템 삭제 ──
  removeItem: (id: string) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  // ── 전체 삭제 ──
  clearAll: () => set({ cartItems: [] }),

  // ── 총 수량 계산 ──
  getTotalAmount: () =>
    get().cartItems.reduce((acc, item) => acc + item.amount, 0),

  // ── 총 금액 계산 ──
  getTotalPrice: () =>
    get().cartItems.reduce(
      (acc, item) => acc + Number(item.price) * item.amount,
      0
    ),

  // ── 모달 열기 ──
  openModal: () => set({ isModalOpen: true }),

  // ── 모달 닫기 ──
  closeModal: () => set({ isModalOpen: false }),
}));
