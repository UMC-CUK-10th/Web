import { useDispatch } from "react-redux";

import {
  increase,
  decrease,
  removeItem,
} from "../stores/cartSlice";

import type {
  CartItem as CartItemType,
} from "../types/cart";

interface Props {
  item: CartItemType;
}

const CartItem = ({ item }: Props) => {
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-[1fr_120px_140px] items-center border-b border-gray-200 py-5 gap-4">

      {/* 앨범 정보 */}
      <div className="flex items-center gap-4 min-w-0">

        <div className="w-20 h-20 overflow-hidden rounded-md flex-shrink-0">
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="min-w-0">
          <h2 className="font-bold text-lg truncate">
            {item.title}
          </h2>

          <p className="text-sm text-gray-500 truncate">
            {item.singer}
          </p>

          <button
            onClick={() =>
              dispatch(removeItem(item.id))
            }
            className="text-red-400 text-sm mt-1"
          >
            삭제
          </button>
        </div>
      </div>

      {/* 가격 */}
      <div className="font-semibold text-center">
        ₩ {Number(item.price).toLocaleString()}
      </div>

      {/* 수량 */}
      <div className="flex items-center justify-center gap-2">

        <button
          onClick={() =>
            dispatch(decrease(item.id))
          }
          className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300"
        >
          -
        </button>

        <span>{item.amount}</span>

        <button
          onClick={() =>
            dispatch(increase(item.id))
          }
          className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;