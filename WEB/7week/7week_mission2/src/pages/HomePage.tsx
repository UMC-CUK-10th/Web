import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useGetLpList } from "../hooks/queries/useGetLpList";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import type { LP } from "../types/lp";

const HomePage = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetLpList(order);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return (
      <div className="flex min-h-[calc(100dvh-72px)] flex-col items-center justify-center gap-5 bg-[#001a2c]">
        <p className="text-sm tracking-[0.1em] text-blue-400 font-medium">데이터 로드 실패</p>
        <button onClick={() => refetch()} className="border border-blue-800 px-6 py-2 text-xs text-blue-300 hover:bg-blue-900/30">Retry</button>
      </div>
    );
  }

  const lpList = data?.pages.flatMap((page) => page?.data || []) || [];

  return (
    // 배경: 위는 더 짙고 아래로 갈수록 살짝 밝아지는 그라데이션 적용
    <div className="min-h-full bg-gradient-to-b from-[#000d1a] via-[#001a2c] to-[#002a45] pb-20 pt-10">
      <section className="mx-auto max-w-7xl px-6">
        {/* 헤더 영역 */}
        <div className="mb-12 flex items-end justify-between border-b border-blue-500/20 pb-6">
          <div>
            <p className="mb-2 text-[10px] tracking-[0.5em] text-blue-400 font-black uppercase opacity-80">
              GGULBEOM MEMORIZE
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-white">
              <span className="text-blue-500">Happy</span> Archive
            </h2>
          </div>

          <div className="flex gap-8 text-[11px] font-bold tracking-[0.2em]">
            <button
              onClick={() => setOrder("asc")}
              className={`transition-all ${order === "asc" ? "text-blue-400 border-b-2 border-blue-400 pb-1" : "text-blue-900 hover:text-blue-300"}`}
            >
              OLDEST
            </button>
            <button
              onClick={() => setOrder("desc")}
              className={`transition-all ${order === "desc" ? "text-blue-400 border-b-2 border-blue-400 pb-1" : "text-blue-900 hover:text-blue-300"}`}
            >
              LATEST
            </button>
          </div>
        </div>

        {/* 메인 리스트 */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-8">
          {isLoading ? (
            <LpCardSkeletonList count={10} />
          ) : (
            lpList.map((lp: LP) => (
              <div key={lp.id} className="group relative transition-all duration-500 hover:-translate-y-2">
                <div className="absolute -inset-1 rounded-2xl bg-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
                <LpCard lp={lp} />
              </div>
            ))
          )}
        </div>

        {/* 무한 스크롤 스피너 영역 */}
        <div ref={ref} className="mt-16 flex flex-col items-center justify-center gap-4 py-10">
          {isFetchingNextPage ? (
            <>
              {/* 세련된 블루 그라데이션 스피너 */}
              <div className="relative flex h-12 w-12 items-center justify-center">
                <div className="absolute h-full w-full animate-spin rounded-full border-4 border-blue-900/30 border-t-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                <div className="h-2 w-2 animate-pulse rounded-full bg-blue-400"></div>
              </div>
              <p className="text-[10px] tracking-[0.3em] text-blue-500/60 font-bold uppercase">
                Fetching More Records...
              </p>
            </>
          ) : hasNextPage ? (
            <div className="h-1 w-1 rounded-full bg-blue-900/30" />
          ) : (
            <p className="text-[11px] tracking-[0.2em] text-blue-900 font-medium">END OF ARCHIVE</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;