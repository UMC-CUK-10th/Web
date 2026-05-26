import { useCartStore } from "../hooks/useCartStore";

const Modal = () => {
  const clearCart = useCartStore((state) => state.clearCart);
  const close = useCartStore((state) => state.close);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
        <p className="text-lg font-semibold mb-6">정말 삭제하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          
          <button 
            onClick={close} 
            className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md font-medium cursor-pointer"
          >
            아니요
          </button>
          
          <button 
            onClick={() => {
              clearCart();
              close();
            }} 
            className="bg-red-500 text-white px-5 py-2 rounded-md font-medium cursor-pointer"
          >
            네
          </button>

        </div>
      </div>
    </div>
  );
};

export default Modal;