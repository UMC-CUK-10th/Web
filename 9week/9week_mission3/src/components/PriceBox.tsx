import { useCartStore } from "../hooks/useCartStore" 
import Modal from "./Modal";

const PriceBox = () => {
  const total = useCartStore((state) => state.total);
  const isOpen = useCartStore((state) => state.isOpen);
  const open = useCartStore((state) => state.open);

  return (
    <div className='p-12 flex justify-between relative'>
      <button 
        onClick={open} 
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