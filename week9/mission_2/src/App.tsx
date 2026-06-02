import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import CartList from "./components/CartList";
import Modal from "./components/Modal";

import {
  calculateTotals,
} from "./features/cart/cartSlice";

import {
  openModal,
} from "./features/modal/modalSlice";

import type { RootState } from "./stores/store";

function App() {
  const dispatch = useDispatch();

  const {
    cartItems,
    amount,
    total,
  } = useSelector(
    (state: RootState) => state.cart
  );

  const isOpen = useSelector(
    (state: RootState) =>
      state.modal.isOpen
  );

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* 헤더 */}
      <header className="bg-slate-900 text-white px-8 py-5 flex items-center justify-between">

        <h1 className="text-2xl font-bold">
          Woohyun Play List
        </h1>

        <div className="flex items-center gap-4">

          <div className="flex items-center gap-2 text-lg">
            🛒
            <span>{amount}</span>
          </div>

          {/* 전체 삭제 버튼 */}
          <button
            onClick={() =>
              dispatch(openModal())
            }
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium"
          >
            전체 삭제
          </button>
        </div>
      </header>

      {/* 모달 */}
      {isOpen && <Modal />}

      {/* 메인 */}
      <main className="max-w-6xl mx-auto mt-8 bg-white rounded-2xl shadow p-8">

        {/* 상단 */}
        <div className="grid grid-cols-[1fr_120px_140px] pb-4 border-b border-gray-300 font-bold text-gray-700">

          <div>앨범 정보</div>

          <div className="text-center">
            가격
          </div>

          <div className="text-center">
            수량
          </div>
        </div>

        {/* 리스트 */}
        <CartList />

        {/* 총합 */}
        <div className="flex items-center justify-between pt-8 text-xl font-bold">

          <p>
            총 수량 : {amount}
          </p>

          <p>
            총 금액 :
            ₩ {total.toLocaleString()}
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;