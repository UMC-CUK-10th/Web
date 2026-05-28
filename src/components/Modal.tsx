import { useDispatch } from '../hooks/useCustomRedux';
import { closeModal } from '../features/modal/modalSlice';
import { clearCart } from '../slices/cartSlice';

const Modal = () => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(closeModal());
  };

  const handleConfirm = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-80 shadow-xl text-center'>
        <h2 className='text-lg font-medium text-gray-900 mb-6'>
          정말 삭제하시겠습니까?
        </h2>
        <div className='flex justify-center space-x-3'>
          <button
            onClick={handleCancel}
            className='px-5 py-2 bg-gray-200 text-gray-700 font-medium rounded hover:bg-gray-300 transition cursor-pointer'
          >
            아니요
          </button>
          <button
            onClick={handleConfirm}
            className='px-5 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600 transition cursor-pointer'
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
