import useCartStore from "../zustandStore"

export default function BottomBar() {
  const { items, removeItem, openModal } = useCartStore()
  const selectedItems = items.filter((item) => item.amount > 0)

  const totalQty = items.reduce((sum, item) => sum + item.amount, 0)
  const totalPrice = items.reduce((sum, item) => sum + Number(item.price) * item.amount, 0)

  if (items.length === 0) return null

  return (
    <div className="
      fixed bottom-0 left-0 right-0 
      bg-white border-t border-gray-100
      px-50
    ">
      <div className="flex flex-col gap-3 p-4">

        {/* 썸네일 목록 */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2 -my-2">
          {selectedItems.map((item) => (
            <div key={item.id} className="relative flex-shrink-0">
              <img
                src={item.img}
                alt={item.title}
                className="w-10 h-10 rounded-lg object-cover border border-gray-100"
              />
              <button
                onClick={() => removeItem(item.id)}
                className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full bg-gray-900 text-white text-[11px] flex items-center justify-center border-2 border-white hover:bg-red-500 transition-colors"
                aria-label="삭제"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* 요약 */}
        <div className="flex flex-col gap-1 border-t border-gray-100 pt-3">
          <div className="flex justify-between">
            <span className="text-xs text-gray-400">총 수량</span>
            <span className="text-xs text-gray-700">{totalQty}장</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm font-medium text-gray-900">결제 금액</span>
            <span className="text-lg font-medium text-gray-900">
              {totalPrice.toLocaleString()}원
            </span>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-2">
          <button
            onClick={openModal}
            className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
          >
            전체 삭제
          </button>
          <button className="flex-[2] py-2.5 rounded-lg bg-gray-900 text-sm font-medium text-white hover:opacity-90 active:opacity-75 transition-opacity">
            결제하기
          </button>
        </div>

      </div>
    </div>
  )
}