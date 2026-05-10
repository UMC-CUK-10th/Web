import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useGetLpList } from "../hooks/queries/useGetLpList";
import type { Lp } from "../apis/lp";

const LpCardSkeleton = () => (
  <div>
    <div className="mb-3 aspect-square animate-pulse border border-emerald-900/30 bg-emerald-950/50 rounded-xl"></div>
    <div className="mb-2 h-2.5 w-1/3 animate-pulse rounded-sm bg-emerald-900/30"></div>
    <div className="h-4 w-2/3 animate-pulse rounded-sm bg-emerald-900/30"></div>
  </div>
);

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
  const navigate = useNavigate();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return (
      <div className="flex min-h-[calc(100dvh-72px)] flex-col items-center justify-center gap-5 bg-[#022c22]">
        <p className="text-sm tracking-[0.1em] text-red-400">데이터를 불러오는 중 오류가 발생했습니다.</p>
        <button
          onClick={() => refetch()}
          className="border border-emerald-800 px-6 py-2 text-xs tracking-[0.15em] text-emerald-500 uppercase transition-colors hover:border-emerald-400 hover:text-emerald-400"
        >
          다시 시도
        </button>
      </div>
    );
  }

  const lpList = data?.pages.flatMap((page) => page?.data || []) || [];

  return (
    <div className="min-h-full bg-[#022c22] pb-20 pt-10">
      <section className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-end justify-between border-b border-emerald-900/50 pb-6">
          <div>
            <p className="mb-2 text-xs tracking-[0.3em] text-emerald-500 uppercase">Premium Collection</p>
            <h2 className="text-3xl font-bold text-stone-100">전체 LP</h2>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setOrder("asc")}
              className={`text-xs tracking-[0.1em] transition-colors ${order === "asc" ? "font-bold text-emerald-400" : "text-emerald-800 hover:text-emerald-500"}`}
            >
              오래된순
            </button>
            <span className="text-emerald-900">|</span>
            <button
              onClick={() => setOrder("desc")}
              className={`text-xs tracking-[0.1em] transition-colors ${order === "desc" ? "font-bold text-emerald-400" : "text-emerald-800 hover:text-emerald-500"}`}
            >
              최신순
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6">
          {isLoading && Array.from({ length: 10 }).map((_, i) => (
            <LpCardSkeleton key={`skeleton-${i}`} />
          ))}

          {!isLoading && lpList.map((lp: Lp) => (
            <div key={lp.id} onClick={() => navigate(`/lp/${lp.id}`)} className="group cursor-pointer">
              <div className="relative mb-3 aspect-square overflow-hidden border border-emerald-900/30 bg-[#011f18] rounded-xl transition-all group-hover:border-emerald-400 group-hover:shadow-[0_0_20px_rgba(52,211,153,0.15)]">
                <img src={lp.thumbnail} alt={lp.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#022c22]/90 p-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="mb-3 w-full truncate text-sm font-bold text-stone-100">{lp.title}</span>
                  <span className="text-[11px] font-semibold tracking-widest text-emerald-400">{lp.createdAt && new Date(lp.createdAt).toLocaleDateString()}</span>
                  <span className="mt-2 text-[11px] font-semibold tracking-widest text-emerald-500/80">♥ {lp.likeCount ?? 0}</span>
                </div>
              </div>
              <p className="mb-1 truncate text-[10px] tracking-[0.25em] text-emerald-600 uppercase">{(lp as any).author?.name || "Premium Artist"}</p>
              <p className="truncate text-sm font-semibold leading-tight text-emerald-100 group-hover:text-emerald-400 transition-colors">{lp.title}</p>
            </div>
          ))}

          {isFetchingNextPage && Array.from({ length: 5 }).map((_, i) => (
            <LpCardSkeleton key={`skeleton-bottom-${i}`} />
          ))}
        </div>

        {!isLoading && lpList.length === 0 && (
          <div className="py-20 text-center text-emerald-900">등록된 LP가 없습니다.</div>
        )}

        {/* 무한 스크롤 감지 영역 */}
        <div ref={ref} className="h-10 w-full" />
      </section>
    </div>
  );
};

export default HomePage;