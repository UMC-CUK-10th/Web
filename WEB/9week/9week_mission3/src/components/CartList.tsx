import { useCartStore } from "../store/useCartStore";
import CartItem from "./CartItem";

const CartList = () => {
  const { cartItems } = useCartStore();

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-32 px-4 flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/5 flex items-center justify-center border border-emerald-500/10 mb-4 text-emerald-500/40 text-3xl font-light">
          !
        </div>
        <h2 className="text-xl font-bold text-emerald-500/60 tracking-tight">
          장바구니가 비어있습니다.
        </h2>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto mt-10 px-4 pb-20">
      <div className="flex flex-col">
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default CartList;