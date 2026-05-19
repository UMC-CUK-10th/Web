import { useEffect, useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import useDebounce from "../hooks/queries/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

function HomePage() {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);

  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE_DELAY);

  const isOnlySpaces =
    debouncedSearch.length > 0 && debouncedSearch.trim().length === 0;

  const {
    data: lps,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, debouncedSearch, order);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isOnlySpaces) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage, isOnlySpaces]);

  if (isOnlySpaces) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#fafafa] px-6 py-8 text-gray-800">
        <div className="mx-auto max-w-6xl">
          <section className="mb-8 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="LP 제목을 검색해보세요"
              className="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100 sm:max-w-sm"
            />

            <div className="flex gap-2">
              <button
                type="button"
                className={`h-10 rounded-xl border px-4 text-sm font-medium transition ${
                  order === PAGINATION_ORDER.asc
                    ? "border-pink-500 bg-pink-500 text-white"
                    : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setOrder(PAGINATION_ORDER.asc)}
              >
                오래된순
              </button>

              <button
                type="button"
                className={`h-10 rounded-xl border px-4 text-sm font-medium transition ${
                  order === PAGINATION_ORDER.desc
                    ? "border-pink-500 bg-pink-500 text-white"
                    : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setOrder(PAGINATION_ORDER.desc)}
              >
                최신순
              </button>
            </div>
          </section>

          <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center text-gray-500 shadow-sm">
            공백만 입력할 수 없습니다.
          </div>
        </div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#fafafa]">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#fafafa] text-xl font-medium text-red-500">
        목록을 불러올 수 없습니다.
      </div>
    );
  }

  const lpList = lps?.pages.map((page) => page.data.data).flat() ?? [];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#fafafa] px-6 py-8 text-gray-800">
      <div className="mx-auto max-w-6xl">
        <section className="mb-8 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="LP 제목을 검색해보세요"
            className="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100 sm:max-w-sm"
          />

          <div className="flex gap-2">
            <button
              type="button"
              className={`h-10 rounded-xl border px-4 text-sm font-medium transition ${
                order === PAGINATION_ORDER.asc
                  ? "border-pink-500 bg-pink-500 text-white"
                  : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setOrder(PAGINATION_ORDER.asc)}
            >
              오래된순
            </button>

            <button
              type="button"
              className={`h-10 rounded-xl border px-4 text-sm font-medium transition ${
                order === PAGINATION_ORDER.desc
                  ? "border-pink-500 bg-pink-500 text-white"
                  : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setOrder(PAGINATION_ORDER.desc)}
            >
              최신순
            </button>
          </div>
        </section>

        {lpList.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {lpList.map((lp) => (
              <LpCard key={lp.id} lp={lp} />
            ))}

            {isFetchingNextPage && <LpCardSkeletonList count={10} />}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center text-gray-500 shadow-sm">
            등록된 LP가 없습니다.
          </div>
        )}

        <div ref={ref} className="h-10" />
      </div>
    </div>
  );
}

export default HomePage;