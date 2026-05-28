import { useSelector } from "react-redux";

import type { RootState } from "../stores/store";

import CartItem from "./CartItems";

const CartList = () => {
  const cartItems = useSelector(
    (state: RootState) => state.cart.cartItems
  );

  return (
    <div className="w-full">
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
};

export default CartList;