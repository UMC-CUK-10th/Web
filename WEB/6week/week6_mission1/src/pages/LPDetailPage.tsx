import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail";
import { useGetComments } from "../hooks/queries/useGetComments";
import { likeLp, unlikeLp } from "../apis/lp";
import CommentSkeleton from "../components/CommentSkeleton";

export default function LpDetailPage() {
  const { lpid } = useParams();
  const lpId = Number(lpid);
  const { ref, inView } = useInView();

  const { data: lpData, isLoading: isLpLoading, isError: isLpError } = useGetLpDetail(lpId);
  const [liked, setLiked] = useState(false);
  const [commentOrder, setCommentOrder] = useState<"asc" | "desc">("desc");

  const { data: commentData, isLoading: isCommentsLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetComments(lpId, commentOrder);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleLike = async () => {
    try {
      if (liked) await unlikeLp(lpId);
      else await likeLp(lpId);
      setLiked((prev) => !prev);
    } catch (e) { console.error(e); }
  };

  if (isLpLoading) return <div className="p-8 text-emerald-400 bg-[#022c22] min-h-screen">로딩 중...</div>;
  if (isLpError) return <div className="p-8 text-red-400 bg-[#022c22] min-h-screen">오류가 발생했습니다.</div>;

  const comments = commentData?.pages.flatMap((page) => page.data || []) || [];

  return (
    <div className="flex w-full flex-col items-center p-6 lg:p-10 bg-[#022c22] min-h-screen">
      <div className="w-full max-w-[860px] rounded-[24px] bg-[#064e3b]/20 border border-emerald-900/40 px-8 py-10 shadow-2xl sm:px-12 backdrop-blur-sm">
        {/* 상단 프로필 영역 */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-[14px] font-bold text-[#022c22]">
              {lpData?.author?.name?.[0] ?? "?"}
            </div>
            <span className="font-medium text-emerald-100">{lpData?.author?.name}</span>
          </div>
          <span className="text-[14px] text-emerald-700">{lpData?.createdAt ? new Date(lpData.createdAt).toLocaleDateString() : ""}</span>
        </div>

        {/* 제목 및 수정/삭제 */}
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-[22px] font-semibold text-stone-100 sm:text-[26px]">{lpData?.title}</h1>
          <div className="flex gap-5">
            <button className="text-emerald-700 hover:text-emerald-400 transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg></button>
            <button className="text-emerald-900 hover:text-red-500 transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg></button>
          </div>
        </div>

        <div className="mb-12 flex justify-center">
          <div className="flex h-[300px] w-[300px] items-center justify-center rounded-xl bg-[#011f18] shadow-inner sm:h-[400px] sm:w-[400px]">
            <div className="relative h-[240px] w-[240px] sm:h-[320px] sm:w-[320px]">
              <img src={lpData?.thumbnail} alt={lpData?.title} className="h-full w-full rounded-full object-cover shadow-2xl border-4 border-[#011f18]" />
              <div className="absolute left-1/2 top-1/2 h-[50px] w-[50px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-900/30 backdrop-blur-sm border border-emerald-500/20 sm:h-[70px] sm:w-[70px]" />
            </div>
          </div>
        </div>

        <p className="mx-auto mb-10 max-w-[660px] text-center text-[14px] leading-relaxed text-emerald-100/70">{lpData?.content}</p>

        {/* 좋아요 섹션 */}
        <div className="flex justify-center border-b border-emerald-900/50 pb-10">
          <button onClick={handleLike} className={`flex items-center gap-2 transition-all transform hover:scale-110 ${liked ? "text-emerald-400" : "text-emerald-800 hover:text-emerald-400"}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
            <span className="text-[18px] font-bold">{liked ? lpData?.likes?.length + 1 : lpData?.likes?.length}</span>
          </button>
        </div>

        <div className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-emerald-100">댓글</h3>
            <div className="flex gap-4">
              <button onClick={() => setCommentOrder("desc")} className={`text-sm transition-colors ${commentOrder === "desc" ? "text-emerald-400 font-bold" : "text-emerald-800"}`}>최신순</button>
              <button onClick={() => setCommentOrder("asc")} className={`text-sm transition-colors ${commentOrder === "asc" ? "text-emerald-400 font-bold" : "text-emerald-800"}`}>오래된순</button>
            </div>
          </div>

          <div className="mb-8 flex gap-3">
            <input type="text" placeholder="댓글을 입력해주세요" className="flex-1 rounded-md border border-emerald-900/50 bg-emerald-950/40 px-4 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none" />
            <button className="rounded-md bg-emerald-700 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-600 transition-colors">작성</button>
          </div>

          <div className="flex flex-col gap-4">
            {isCommentsLoading && Array.from({ length: 3 }).map((_, i) => <CommentSkeleton key={`init-skel-${i}`} />)}
            {comments.map((comment: any) => (
              <div key={comment.id} className="flex gap-4 py-3 border-b border-emerald-900/20">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-900 text-xs font-bold text-emerald-400">{comment.author?.name?.[0]}</div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2"><span className="text-sm font-bold text-emerald-100">{comment.author?.name}</span><span className="text-xs text-emerald-800">{new Date(comment.createdAt).toLocaleDateString()}</span></div>
                  <p className="mt-1 text-sm text-emerald-100/60">{comment.content}</p>
                </div>
              </div>
            ))}
            {isFetchingNextPage && Array.from({ length: 2 }).map((_, i) => <CommentSkeleton key={`next-skel-${i}`} />)}
          </div>
          <div ref={ref} className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}