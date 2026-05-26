import { useDispatch } from "../hooks/useCustomRedux";
import { clearCart } from "../features/cart/cartSlice";
import { closeModal } from "../features/modal/modalSlice";

const Modal = () => {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
        <p className="text-lg font-semibold mb-6">정말 삭제하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          
          <button 
            onClick={() => dispatch(closeModal())} 
            className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md font-medium cursor-pointer"
          >
            아니요
          </button>
          
          <button 
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
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