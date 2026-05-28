import { useCartStore } from "../stores/useCartStore";

const Modal = () => {
  const {
    clearCart,
    closeModal,
  } = useCartStore();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-8 w-[400px]">

        <h2 className="text-2xl font-bold text-center">

          장바구니를 비우시겠습니까?
        </h2>

        <div className="flex justify-center gap-4 mt-8">

          {/* 아니요 */}
          <button
            onClick={closeModal}
            className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            아니요
          </button>

          {/* 네 */}
          <button
            onClick={() => {
              clearCart();
              closeModal();
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