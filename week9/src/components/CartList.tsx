import { useCartStore } from "../store/useCartStore";
import CartItem from "./CartItem";

const CartList = () => {
  const cartItems = useCartStore((state) => state.cartItems);

  if (cartItems.length === 0) {
    return (
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold text-gray-700">
          장바구니가 비어있습니다.
        </h2>
      </div>
    );
  }

  return (
    <section className="mx-auto mt-10 max-w-4xl px-4">
      {cartItems.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
    </section>
  );
};

export default CartList;