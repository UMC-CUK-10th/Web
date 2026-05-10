import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ErrorDisplay from "../components/ErrorDisplay";
import LpCard from "../components/LpCard";
import LpCardSkeletonList from "../components/LpCardSkeletonList";
import useGetInfiniteLpList from "../hooks/useGetInfiniteLpList";

const HomePage = () => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const { ref, inView } = useInView({ threshold: 0 });

  const {
    data,
    isLoading,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteLpList(30, order);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  if (isError) {
    return <ErrorDisplay />;
  }

  const lpList = data?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <div className="p-8">
      <div className="mb-4 flex items-center justify-end gap-2">
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

      {isLoading && (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          <LpCardSkeletonList count={10} />
        </div>
      )}

      {!isLoading && (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {lpList.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        </div>
      )}

      {!isLoading && isFetching && !isFetchingNextPage && lpList.length === 0 && (
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          <LpCardSkeletonList count={10} />
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
