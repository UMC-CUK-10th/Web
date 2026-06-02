import { useCartStore } from "../store/useCartStore";
import type { CartItemType } from "../types/cart";

const CartItem = ({ id, img, title, singer, price, amount }: CartItemType) => {
  const increase = useCartStore((state) => state.increase);
  const decrease = useCartStore((state) => state.decrease);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <article className="flex items-center justify-between border-b border-gray-100 py-6">
      <div className="flex items-center gap-6">
        <img
          src={img}
          alt={title}
          className="h-20 w-20 rounded-lg object-cover"
        />

        <div>
          <h4 className="text-lg font-bold text-gray-900">{title}</h4>
          <h5 className="mb-2 text-sm text-gray-500">{singer}</h5>
          <p className="font-bold text-gray-900">
            {Number(price).toLocaleString()}원
          </p>

          <button
            type="button"
            onClick={() => removeItem(id)}
            className="mt-2 text-sm font-medium text-red-400 hover:text-red-500"
          >
            삭제
          </button>
        </div>
      </div>

      <div className="flex items-center overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <button
          type="button"
          className="bg-gray-100 px-3 py-1 text-gray-600 transition hover:bg-gray-200"
          onClick={() => decrease(id)}
        >
          -
        </button>

        <div className="min-w-[2.5rem] px-4 py-1 text-center font-semibold">
          {amount}
        </div>

        <button
          type="button"
          className="bg-gray-100 px-3 py-1 text-gray-600 transition hover:bg-gray-200"
          onClick={() => increase(id)}
        >
          +
        </button>
      </div>
    </article>
  );
};

export default CartItem;