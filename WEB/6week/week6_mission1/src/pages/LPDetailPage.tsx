import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail";
import { likeLp, unlikeLp } from "../apis/lp";

export default function LpDetailPage() {
  const { lpid } = useParams();
  const lpId = Number(lpid);

  const { data, isLoading, isError } = useGetLpDetail(lpId);
  const [liked, setLiked] = useState(false);

  const baseLikeCount = data?.likes?.length ?? 0;
  const displayLikeCount = liked ? baseLikeCount + 1 : baseLikeCount;

  const handleLike = async () => {
    try {
      if (liked) {
        await unlikeLp(lpId);
      } else {
        await likeLp(lpId);
      }
      setLiked((prev) => !prev);
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) return <div className="p-8 text-emerald-400 bg-[#022c22] min-h-screen">로딩 중...</div>;
  if (isError) return <div className="p-8 text-red-400 bg-[#022c22] min-h-screen">오류가 발생했습니다.</div>;

  return (
    <div className="flex w-full items-start justify-center p-6 lg:p-10 bg-[#022c22] min-h-screen">
      {/* 카드 배경을 짙은 그린 톤으로 변경 */}
      <div className="w-full max-w-[860px] rounded-[24px] bg-[#064e3b]/30 border border-emerald-900/50 px-8 py-10 shadow-2xl sm:px-12 backdrop-blur-sm">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* 작성자 아바타: 에메랄드 배경 */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-[14px] font-bold text-[#022c22]">
              {data?.author?.name?.[0] ?? "?"}
            </div>
            <span className="font-medium text-emerald-100">{data?.author?.name}</span>
          </div>
          <span className="text-[14px] text-emerald-700">
            {data?.createdAt ? new Date(data.createdAt).toLocaleDateString() : ""}
          </span>
        </div>

        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-[22px] font-semibold text-stone-100 sm:text-[26px]">
            {data?.title}
          </h1>
          <div className="flex gap-5">
            <button className="text-emerald-700 transition-colors hover:text-emerald-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </button>
            <button className="text-emerald-900 transition-colors hover:text-red-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>

        {/* LP판 이미지 영역: 턴테이블 느낌의 딥그린 배경 */}
        <div className="mb-12 flex justify-center">
          <div className="flex h-[300px] w-[300px] items-center justify-center rounded-xl bg-[#011f18] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] sm:h-[400px] sm:w-[400px]">
            <div className="relative h-[240px] w-[240px] sm:h-[320px] sm:w-[320px]">
              <img
                src={data?.thumbnail}
                alt={data?.title}
                className="h-full w-full rounded-full object-cover shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-4 border-[#011f18]"
              />
              <div className="absolute left-1/2 top-1/2 h-[50px] w-[50px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-900/20 backdrop-blur-md shadow-inner border border-emerald-500/30 sm:h-[70px] sm:w-[70px]" />
            </div>
          </div>
        </div>

        <p className="mx-auto mb-10 max-w-[660px] text-center text-[14px] leading-relaxed text-emerald-100/70 sm:text-[15px]">
          {data?.content}
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {data?.tags?.map((tag: { id: number; name: string }) => (
            <span
              key={tag.id}
              className="rounded-full bg-emerald-900/40 border border-emerald-800/50 px-4 py-1.5 text-[13px] text-emerald-300 transition-colors hover:bg-emerald-800/60"
            >
              # {tag.name}
            </span>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition-all transform hover:scale-110 ${
              liked ? "text-emerald-400" : "text-emerald-800 hover:text-emerald-400"
            }`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="text-[18px] font-bold">{displayLikeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}