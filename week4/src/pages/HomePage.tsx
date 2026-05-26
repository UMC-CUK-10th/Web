import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ErrorDisplay from "../components/ErrorDisplay";
import LpCard from "../components/LpCard";
import LpCardSkeletonList from "../components/LpCardSkeletonList";
import useDebounce from "../hooks/useDebounce";
import useGetInfiniteLpList from "../hooks/useGetInfiniteLpList";
import useSearchInfiniteLpList from "../hooks/useSearchInfiniteLpList";
import useThrottle from "../hooks/useThrottle";

const HomePage = () => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [query, setQuery] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const { ref, inView } = useInView({ threshold: 0 });
  const normalizedQuery = query.trim();
  const debouncedQuery = useDebounce(normalizedQuery, 300);
  const throttledScrollY = useThrottle(scrollY, 200);
  const isSearchMode = normalizedQuery.length > 0;

  const defaultLpListQuery = useGetInfiniteLpList(30, order, !isSearchMode);
  const searchLpListQuery = useSearchInfiniteLpList(30, order, debouncedQuery);

  const activeQuery = isSearchMode ? searchLpListQuery : defaultLpListQuery;
  const {
    data,
    isLoading,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = activeQuery;

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    const viewportBottom = throttledScrollY + window.innerHeight;
    const pageBottom = document.documentElement.scrollHeight;
    const isNearBottom = pageBottom - viewportBottom <= 240;

    if (isNearBottom) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, throttledScrollY]);

  if (isError) {
    return <ErrorDisplay />;
  }

  const lpList = data?.pages.flatMap((page) => page.data.data) ?? [];
  const isDebouncing = isSearchMode && debouncedQuery !== normalizedQuery;

  return (
    <div className="p-8">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="LP 제목을 검색해보세요"
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm outline-none transition-colors focus:border-gray-500 md:max-w-sm"
        />

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => setOrder("asc")}
            className={`cursor-pointer rounded-md px-3 py-1 text-sm font-semibold transition-colors duration-200 ${
              order === "asc"
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            오래된순
          </button>

          <button
            onClick={() => setOrder("desc")}
            className={`cursor-pointer rounded-md px-3 py-1 text-sm font-semibold transition-colors duration-200 ${
              order === "desc"
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            최신순
          </button>
        </div>
      </div>

      {isDebouncing && (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          <LpCardSkeletonList count={10} />
        </div>
      )}

      {!isDebouncing && isLoading && (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          <LpCardSkeletonList count={10} />
        </div>
      )}

      {!isDebouncing && !isLoading && (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {lpList.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        </div>
      )}

      {!isDebouncing && !isLoading && isFetching && !isFetchingNextPage && lpList.length === 0 && (
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          <LpCardSkeletonList count={10} />
        </div>
      )}

      {!isDebouncing && !isLoading && !isFetching && lpList.length === 0 && (
        <div className="mt-6 rounded-md border border-dashed border-gray-300 px-4 py-10 text-center text-sm text-gray-500">
          {isSearchMode
            ? "검색 결과가 없습니다."
            : "표시할 LP가 없습니다."}
        </div>
      )}

      <div ref={ref} className="mt-6 min-h-10">
        {isFetchingNextPage && (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            <LpCardSkeletonList count={5} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
