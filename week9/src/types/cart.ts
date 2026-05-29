export type Lp = {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
};

export type CartItems = Lp[];

export type CartState = {
  cartItems: CartItems;
  amount: number;
  total: number;
};
