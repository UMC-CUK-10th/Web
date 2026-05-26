import { useSelector, useDispatch } from "../hooks/useCustomRedux";
import { openModal } from "../features/modal/modalSlice";
import { type RootState } from "../store/store";
import Modal from "./Modal";

const PriceBox = () => {
  const { total } = useSelector((state: RootState) => state.cart);
  const { isOpen } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  return (
    <div className='p-12 flex justify-between relative'>
      <button 
        onClick={() => dispatch(openModal())} 
        className='border p-4 rounded-md cursor-pointer'
      >
        장바구니 초기화
      </button>
      <div>총 가격: {total}원</div>
      {isOpen && <Modal />}
    </div>
  );
};

export default PriceBox;