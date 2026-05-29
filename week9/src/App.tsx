import Modal from './components/Modal';
import { useCartStore } from './store/useCartStore';

const currencyFormatter = new Intl.NumberFormat('ko-KR');

function App() {
  const { cartItems, amount, total, isOpen, increase, decrease, removeItem, openModal } =
    useCartStore();

  return (
    <>
      <main className="min-h-screen bg-zinc-50 text-zinc-950">
        <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
            <h1 className="text-xl font-bold tracking-normal sm:text-2xl">음반 장바구니</h1>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-zinc-600">총 수량</span>
              <span className="grid h-9 min-w-9 place-items-center rounded-full bg-emerald-600 px-3 text-sm font-bold text-white">
                {amount}
              </span>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-5xl px-5 py-8">
          <div className="mb-6 flex flex-col justify-between gap-4 border-b border-zinc-200 pb-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold text-emerald-700">Cart</p>
              <h2 className="mt-1 text-2xl font-bold tracking-normal sm:text-3xl">
                담긴 음반 {cartItems.length}개
              </h2>
            </div>
            <button
              type="button"
              onClick={openModal}
              disabled={cartItems.length === 0}
              className="h-10 rounded-md border border-red-300 px-4 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-zinc-200 disabled:text-zinc-400 disabled:hover:bg-transparent"
            >
              전체 삭제
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex min-h-80 items-center justify-center rounded-md border border-dashed border-zinc-300 bg-white">
              <p className="text-base font-medium text-zinc-500">장바구니가 비어 있습니다.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="grid grid-cols-[5rem_1fr] gap-4 rounded-md border border-zinc-200 bg-white p-4 shadow-sm sm:grid-cols-[6rem_1fr_auto]"
                >
                  <img
                    src={item.img}
                    alt={`${item.title} 앨범 커버`}
                    className="h-20 w-20 rounded-md object-cover sm:h-24 sm:w-24"
                  />

                  <div className="min-w-0">
                    <h3 className="truncate text-base font-bold text-zinc-950 sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-1 truncate text-sm font-medium text-zinc-500">
                      {item.singer}
                    </p>
                    <p className="mt-3 text-sm font-bold text-zinc-900">
                      {currencyFormatter.format(Number(item.price))}원
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="mt-3 text-sm font-semibold text-red-600 hover:text-red-700"
                    >
                      삭제
                    </button>
                  </div>

                  <div className="col-span-2 flex items-center justify-between border-t border-zinc-100 pt-4 sm:col-span-1 sm:flex-col sm:justify-center sm:border-t-0 sm:pt-0">
                    <button
                      type="button"
                      aria-label={`${item.title} 수량 증가`}
                      onClick={() => increase(item.id)}
                      className="grid h-9 w-9 place-items-center rounded-md bg-zinc-900 text-lg font-bold text-white transition hover:bg-zinc-700"
                    >
                      +
                    </button>
                    <span className="min-w-10 text-center text-lg font-bold">{item.amount}</span>
                    <button
                      type="button"
                      aria-label={`${item.title} 수량 감소`}
                      onClick={() => decrease(item.id)}
                      className="grid h-9 w-9 place-items-center rounded-md bg-zinc-100 text-lg font-bold text-zinc-800 transition hover:bg-zinc-200"
                    >
                      -
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 border-t border-zinc-200 pt-5">
            <div className="flex items-center justify-between text-lg font-bold">
              <span>총 금액</span>
              <span>{currencyFormatter.format(total)}원</span>
            </div>
          </div>
        </section>
      </main>
      {isOpen && <Modal />}
    </>
  );
}

export default App;
