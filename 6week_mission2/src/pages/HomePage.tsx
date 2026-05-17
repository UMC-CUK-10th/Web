import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteGetLpList } from "../hooks/queries/useInfiniteGetLpList";
import LpCard from "../components/LpCard";
import LpCardSkeletonList from "../components/LpCardSkeletonList";

const HomePage = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage, isError } = useInfiniteGetLpList({
    limit: 10,
    search,
    order: "desc",
  });

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return (
      <div className="min-h-screen bg-black pt-28 px-4 text-center text-red-500">
        데이터를 가져오는 중에 에러가 발생했습니다.
      </div>
    );
  }

  const lpList = data?.pages
    ?.flatMap((page) => {
      const pageData = page?.data ?? page;
      return pageData?.data ?? [];
    }) ?? [];

  return (
    <main className="min-h-screen bg-black pt-28 px-4 pb-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">돌려돌려LP판</h1>
            <p className="mt-2 text-sm text-gray-300">무한 스크롤로 LP를 확인해보세요.</p>
          </div>

          <div className="w-full sm:w-[360px]">
            <input
              type="text"
              className="w-full rounded-md border border-gray-700 bg-zinc-900 px-4 py-3 text-white shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="LP 제목을 검색하세요"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading && <LpCardSkeletonList count={12} />}

          {!isLoading && lpList.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-gray-700 bg-zinc-900 p-10 text-center text-gray-400">
              LP 리스트를 불러오지 못했습니다. 검색어를 바꿔보거나 새로고침 해보세요.
            </div>
          )}

          {lpList.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}

          {isFetching && !isLoading && <LpCardSkeletonList count={4} />}
        </div>
      </div>

      <div ref={ref} className="h-10 w-full" />
    </main>
  );
};

export default HomePage;