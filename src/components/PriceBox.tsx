import { useDispatch, useSelector } from '../hooks/useCustomRedux';
import { openModal } from '../features/modal/modalSlice';

const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    // 이제 바로 초기화하지 않고 모달을 열어줍니다.
    dispatch(openModal());
  };

  return (
    <div className='p-12 flex justify-between'>
      <button
        onClick={handleOpenModal}
        className='border p-4 rounded-md cursor-pointer hover:bg-gray-50'
      >
        장바구니 초기화
      </button>
      <div className='text-xl font-bold'>총 가격: {total}원</div>
    </div>
  );
};

export default PriceBox;
