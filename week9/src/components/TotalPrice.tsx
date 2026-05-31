import { useCartActions, useCartInfo } from "../hooks/useCustomRedux";

const TotalPrice = () => {
  const { total } = useCartInfo();
  const { clearCart } = useCartActions();

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-10">
      <button
        type="button"
        onClick={handleClearCart}
        className="rounded-lg border border-red-300 px-5 py-3 font-medium text-red-500 transition hover:bg-red-50"
      >
        전체 삭제
      </button>

      <div className="rounded-lg bg-gray-100 px-5 py-3 text-lg font-bold text-gray-900">
        총 가격: {total.toLocaleString()}원
      </div>
    </div>
  );
};

export default TotalPrice;