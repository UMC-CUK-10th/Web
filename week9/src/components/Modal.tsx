import { useCartStore } from '../store/useCartStore';

function Modal() {
  const { clearCart, closeModal } = useCartStore();

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-white/30 px-5 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="clear-cart-modal-title"
        className="w-full max-w-[265px] rounded-md bg-white px-7 py-8 shadow-lg"
      >
        <h2 id="clear-cart-modal-title" className="text-center text-xl font-bold text-zinc-950">
          정말 삭제하시겠습니까?
        </h2>

        <div className="mt-6 flex justify-center gap-5">
          <button
            type="button"
            onClick={closeModal}
            className="h-12 rounded-md bg-zinc-200 px-5 text-lg font-medium text-slate-700 transition hover:bg-zinc-300"
          >
            아니요
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="h-12 rounded-md bg-red-500 px-5 text-lg font-medium text-white transition hover:bg-red-600"
          >
            네
          </button>
        </div>
      </section>
    </div>
  );
}

export default Modal;
