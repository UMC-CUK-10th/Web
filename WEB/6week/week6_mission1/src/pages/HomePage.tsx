import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetLpList } from "../hooks/queries/useGetLpList";
import type { Lp } from "../apis/lp";

const HomePage = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const { data, isLoading, isError, refetch } = useGetLpList(order);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100dvh-72px)] items-center justify-center bg-[#022c22]">
        <p className="text-sm tracking-[0.2em] text-emerald-400 uppercase animate-pulse">
          Loading Library...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[calc(100dvh-72px)] flex-col items-center justify-center gap-5 bg-[#022c22]">
        <p className="text-sm tracking-[0.1em] text-red-400">데이터를 불러오는 중 오류가 발생했습니다.</p>
        <button
          onClick={() => refetch()}
          className="border border-emerald-800 px-6 py-2 text-xs tracking-[0.15em] text-emerald-600 uppercase transition-colors hover:border-emerald-400 hover:text-emerald-400"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#022c22] pb-20 pt-10">
      <section className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-end justify-between border-b border-emerald-900/50 pb-6">
          <div>
            <p className="mb-2 text-xs tracking-[0.3em] text-emerald-500 uppercase">
              Deep Green Collection
            </p>
            <h2 className="text-3xl font-bold text-stone-100">전체 LP</h2>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setOrder("asc")}
              className={`text-xs tracking-[0.1em] transition-colors ${
                order === "asc" ? "font-bold text-emerald-400" : "text-emerald-800 hover:text-emerald-500"
              }`}
            >
              오래된순
            </button>
            <span className="text-emerald-900">|</span>
            <button
              onClick={() => setOrder("desc")}
              className={`text-xs tracking-[0.1em] transition-colors ${
                order === "desc" ? "font-bold text-emerald-400" : "text-emerald-800 hover:text-emerald-500"
              }`}
            >
              최신순
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6">
          {data?.data?.map((lp: Lp) => (
            <div
              key={lp.id}
              onClick={() => navigate(`/lp/${lp.id}`)}
              className="group cursor-pointer"
            >
              {/* 이미지 카드: 에메랄드 보더 포인트 */}
              <div className="relative mb-3 aspect-square overflow-hidden border border-emerald-900/30 bg-[#011f18] transition-all duration-300 group-hover:border-emerald-400 group-hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                <img
                  src={lp.thumbnail}
                  alt={lp.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                />

                {/* 호버 시 나타나는 오버레이: 딥그린 반투명 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#022c22]/90 p-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="mb-3 w-full truncate text-sm font-bold text-stone-100">
                    {lp.title}
                  </span>
                  <span className="text-[11px] font-semibold tracking-widest text-emerald-400">
                    {lp.createdAt && new Date(lp.createdAt).toLocaleDateString()}
                  </span>
                  <span className="mt-2 text-[11px] font-semibold tracking-widest text-emerald-500/80">
                    ♥ {lp.likeCount ?? 0}
                  </span>
                </div>
              </div>

              <p className="mb-1 truncate text-[10px] tracking-[0.25em] text-emerald-600 uppercase">
                {/* @ts-ignore */}
                {lp.author?.name || "Premium Artist"}
              </p>
              <p className="truncate text-sm font-semibold leading-tight text-emerald-100 group-hover:text-emerald-400 transition-colors">
                {lp.title}
              </p>
            </div>
          ))}
        </div>

        {(!data?.data || data.data.length === 0) && (
          <div className="py-20 text-center text-emerald-900 font-medium">
            비어있는 라이브러리입니다.
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;