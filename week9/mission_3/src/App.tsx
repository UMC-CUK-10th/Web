import { useEffect } from "react";

import CartList from "./components/CartList";
import Modal from "./components/Modal";

import { useCartStore } from "./stores/useCartStore";

function App() {
  const {
    cartItems,
    amount,
    total,
    isOpen,
    calculateTotals,
    openModal,
  } = useCartStore();

  useEffect(() => {
    calculateTotals();
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* 헤더 */}
      <header className="bg-slate-900 text-white px-8 py-5 flex items-center justify-between">

        <h1 className="text-2xl font-bold">
          UMC Play List
        </h1>

        <div className="flex items-center gap-4">

          <div className="flex items-center gap-2 text-lg">
            🛒
            <span>{amount}</span>
          </div>

          <button
            onClick={openModal}
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

        {/* 헤더 */}
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