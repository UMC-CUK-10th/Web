import { useCartStore } from '../store/useCartStore';

const Modal = () => {
  const { isModalOpen, closeModal, clearAll } = useCartStore();

  if (!isModalOpen) return null;

  // 전체 삭제 확인 → clearAll + 모달 닫기
  const handleConfirm = () => {
    clearAll();
    closeModal();
  };

  return (
    // 오버레이
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
    >
      {/* 모달 카드 */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-sm flex flex-col items-center gap-6 animate-fade-in">
        <div className="text-4xl">🗑️</div>
        <div className="text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-1">
            장바구니를 비울까요?
          </h2>
          <p className="text-sm text-gray-500">
            모든 아이템이 삭제됩니다. 계속하시겠어요?
          </p>
        </div>

        <div className="flex gap-3 w-full">
          {/* 아니요 */}
          <button
            onClick={closeModal}
            className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
          >
            아니요
          </button>
          {/* 네 */}
          <button
            onClick={handleConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
          >
            네, 삭제할게요
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
