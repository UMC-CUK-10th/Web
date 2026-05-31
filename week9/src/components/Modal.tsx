type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const Modal = ({ isOpen, onClose, onConfirm }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[90%] max-w-sm rounded-2xl bg-white p-8 text-center shadow-xl">
        <h2 className="mb-3 text-xl font-bold text-gray-900">
          삭제하시겠습니까?
        </h2>

        <p className="mb-8 text-sm text-gray-500">
          장바구니의 모든 음반이 삭제됩니다.
        </p>

        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={onConfirm}
            className="h-11 w-24 rounded-xl bg-red-500 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            네
          </button>

          <button
            type="button"
            onClick={onClose}
            className="h-11 w-24 rounded-xl border border-gray-300 bg-white text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;