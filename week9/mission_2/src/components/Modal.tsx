import { useDispatch } from "react-redux";

import {
  closeModal,
} from "../features/modal/modalSlice";

import {
  clearCart,
} from "../features/cart/cartSlice";

const Modal = () => {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-8 w-[400px]">

        <h2 className="text-2xl font-bold text-center">
          정말 삭제하시겠습니까?
        </h2>

        <div className="flex justify-center gap-4 mt-8">

          {/* 아니요 */}
          <button
            onClick={() =>
              dispatch(closeModal())
            }
            className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            아니요
          </button>

          {/* 네 */}
          <button
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
            className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;