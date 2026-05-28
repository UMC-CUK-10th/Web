import CartItem from "./CartItems";

import { useCartStore } from "../stores/useCartStore";

const CartList = () => {
  const { cartItems } = useCartStore();

  return (
    <div>
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