import { useDispatch } from 'react-redux'
import { increase, decrease } from '../features/cart/cartSlice'

interface CartItemProps {
  id: string
  title: string
  singer: string
  price: string
  img: string
  amount: number
  stock: number  // 추가
}

export default function CartItem({ id, title, singer, price, img, amount, stock }: CartItemProps) {
  const dispatch = useDispatch()

  const handleIncrease = () => dispatch(increase(id))
  const handleDecrease = () => dispatch(decrease(id))

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
      {/* 앨범 커버 */}
      <img
        src={img}
        alt={title}
        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
      />

      {/* 트랙 정보 */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
        <p className="text-xs text-gray-400 truncate mt-0.5">{singer}</p>
      </div>

      {/* 가격 */}
      <span className="text-sm font-medium text-gray-800 flex-shrink-0">
        {Number(price).toLocaleString()}원
      </span>

      {/* 수량 조절 */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={handleDecrease}
          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 active:scale-95 transition-all text-base leading-none"
        >
          −
        </button>
        <span className="text-sm font-medium text-gray-900 w-4 text-center">
          {amount}
        </span>
        <button
          onClick={handleIncrease}
          disabled={amount >= stock}
          className="
            w-7 h-7 rounded-full border border-gray-200 
            flex items-center justify-center text-gray-500 
            hover:bg-gray-100 active:scale-95 transition-all text-base leading-none
            disabled:opacity-30 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>
    </div>
  )
}