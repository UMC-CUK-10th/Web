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