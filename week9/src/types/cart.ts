export type CartItemType = {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
};

export type CartState = {
  cartItems: CartItemType[];
  amount: number;
  total: number;
};

export type ModalState = {
  isOpen: boolean;
};

export type CartStoreType = {
  cartItems: CartItemType[];
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