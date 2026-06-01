import useCartStore from "../zustandStore"

export default function ConfirmModal() {
  const { isModalOpen, clearAll, closeModal } = useCartStore()

  if (!isModalOpen) return null

  const handleConfirm = () => {
    clearAll()
    closeModal()
  }

  const handleCancel = () => {
    closeModal()
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={handleCancel}
    >
      <div
        className="bg-white rounded-2xl p-6 mx-4 w-full max-w-sm flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-medium text-gray-900">전체 삭제</h2>
          <p className="text-sm text-gray-400">담은 곡을 모두 삭제할까요?</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCancel}
            className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className="flex-[2] py-2.5 rounded-lg bg-gray-900 text-sm font-medium text-white hover:opacity-90 active:opacity-75 transition-opacity"
          >
            전체 삭제
          </button>
        </div>
      </div>
    </div>
  )
}