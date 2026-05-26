import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail";
import { useGetComments } from "../hooks/queries/useGetComments";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { usePostLike } from "../hooks/mutations/usePostLike";
import { useDeleteLike } from "../hooks/mutations/useDeleteLike";
import { useCreateComment } from "../hooks/mutations/useCreateComment";
import { useDeleteComment } from "../hooks/mutations/useDeleteComment";
import { useUpdateComment } from "../hooks/mutations/useUpdateComment";
import { useDeleteLp } from "../hooks/mutations/useDeleteLp";

export default function LpDetailPage() {
  const { lpid } = useParams();
  const lpId = Number(lpid);

  const { ref, inView } = useInView();

  const { data: myInfo } = useGetMyInfo();
  const currentUserId = myInfo?.data?.id;

  const { data: lpData, isLoading: isLpLoading } = useGetLpDetail(lpId);

  const [commentOrder, setCommentOrder] = useState<"asc" | "desc">("desc");

  const {
    data: commentData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetComments(lpId, commentOrder);

  const { mutate: postLike } = usePostLike();
  const { mutate: deleteLike } = useDeleteLike();

  const { mutate: createComment } = useCreateComment();
  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: updateComment } = useUpdateComment();

  const { mutate: deleteLp } = useDeleteLp();

  const [commentInput, setCommentInput] = useState("");

  const isMyLp = lpData?.authorId === currentUserId;

  const isLiked =
    lpData?.likes?.some((like: any) => like.userId === currentUserId) || false;

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleLikeToggle = () => {
    if (isLiked) {
      deleteLike({ lpId });
    } else {
      postLike({ lpId });
    }
  };

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) return;

    createComment(
      {
        lpId,
        content: commentInput,
      },
      {
        onSuccess: () => {
          setCommentInput("");
        },
      }
    );
  };

  const handleDeleteLp = () => {
    if (window.confirm("정말 이 게시글을 삭제하시겠습니까?")) {
      deleteLp(lpId);
    }
  };

  const handleUpdateComment = (commentId: number, currentContent: string) => {
    const newContent = window.prompt("댓글을 수정하세요:", currentContent);

    if (
      newContent !== null &&
      newContent.trim() !== "" &&
      newContent !== currentContent
    ) {
      updateComment({
        lpId,
        commentId,
        content: newContent.trim(),
      });
    }
  };

  const handleDeleteComment = (commentId: number) => {
    if (window.confirm("정말 이 댓글을 삭제하시겠습니까?")) {
      deleteComment({
        lpId,
        commentId,
      });
    }
  };

  // 💡 [수정] 기존 텍스트 대신 세련된 커스텀 로딩 스피너 적용
  if (isLpLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#000d1a] gap-6">
        <div className="relative flex items-center justify-center">
          {/* 스피너 외곽 회전 라인 */}
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-900/20 border-t-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]" />
          {/* 중앙에서 깜빡이는 로고 포인트 (LP 중심축 모티브) */}
          <div className="absolute h-4 w-4 animate-pulse rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-[13px] font-black tracking-[0.4em] text-blue-500/60 uppercase animate-pulse">
            Loading Record
          </p>
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
        </div>
      </div>
    );
  }

  const comments = commentData?.pages.flatMap((page) => page.data || []) || [];

  return (
    <div className="flex w-full flex-col items-center bg-gradient-to-b from-[#000d1a] via-[#001a2c] to-[#002a45] p-6 lg:p-10">
      <div className="w-full max-w-[860px] rounded-[32px] border border-blue-900/30 bg-[#001a2c]/60 px-8 py-10 shadow-2xl backdrop-blur-xl sm:px-12">
        {/* 상단 프로필 */}
        <div className="mb-8 flex items-center justify-between border-b border-blue-900/20 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white shadow-lg shadow-blue-600/30">
              {lpData?.author?.name?.[0] ?? "?"}
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-white">{lpData?.author?.name}</span>

              <span className="text-xs text-blue-900 font-bold">
                {lpData?.createdAt
                  ? new Date(lpData.createdAt).toLocaleDateString()
                  : ""}
              </span>
            </div>
          </div>

          {isMyLp && (
            <div className="flex gap-3 text-blue-900 font-bold text-xs uppercase tracking-widest">
              <button
                onClick={() => alert("수정 기능이 준비 중입니다.")}
                className="transition-colors hover:text-blue-400"
              >
                Edit
              </button>

              <button
                onClick={handleDeleteLp}
                className="transition-colors hover:text-red-500"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* 제목 */}
        <h1 className="mb-8 text-center text-[28px] font-black tracking-tight text-white sm:text-[34px]">
          {lpData?.title}
        </h1>

        {/* [애니메이션 강화] LP 이미지 영역 */}
        <div className="mb-14 flex justify-center">
          <div className="relative group">
            {/* 1. 배경 네온 글로우: 심장 박동처럼 깜빡이는 효과 */}
            <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-1000 animate-[pulse_4s_ease-in-out_infinite]" />
            
            {/* 2. 회전하는 빛의 띠: LP판 바깥쪽을 감싸며 도는 빛 */}
            <div className="absolute -inset-[2px] rounded-full bg-gradient-to-tr from-blue-500 via-transparent to-cyan-300 opacity-30 animate-[spin_4s_linear_infinite]" />

            {/* 3. LP 본체 */}
            <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-full border-[14px] border-[#000d1a] shadow-[0_0_80px_rgba(37,99,235,0.25)] transition-transform duration-700 hover:scale-[1.02]">
              <img
                src={lpData?.thumbnail}
                alt="LP"
                className="h-full w-full object-cover animate-[spin_15s_linear_infinite]"
              />

              {/* 턴테이블 중심 구멍 */}
              <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-blue-900/30 bg-[#000d1a] flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
              </div>
            </div>
          </div>
        </div>

        {/* 내용 */}
        <p className="mx-auto mb-10 max-w-[660px] whitespace-pre-wrap text-center leading-relaxed text-blue-100/60 font-medium">
          {lpData?.content}
        </p>

        {/* 좋아요 */}
        <div className="flex justify-center border-b border-blue-900/20 pb-10">
          <button
            onClick={handleLikeToggle}
            className={`flex items-center gap-2 transition-all transform active:scale-90 ${
              isLiked
                ? "text-blue-500 scale-110 font-black"
                : "text-blue-900 hover:text-blue-400"
            }`}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill={isLiked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>

            <span className="text-[20px] font-black tabular-nums">
              {lpData?.likes?.length || 0}
            </span>
          </button>
        </div>

        {/* 댓글 */}
        <div className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-[18px] font-black tracking-widest text-white uppercase">
              Comments
            </h3>

            <div className="flex gap-4 text-[11px] font-black uppercase text-blue-900">
              <button
                onClick={() => setCommentOrder("desc")}
                className={commentOrder === "desc" ? "text-blue-400" : "hover:text-blue-200"}
              >
                Newest
              </button>

              <button
                onClick={() => setCommentOrder("asc")}
                className={commentOrder === "asc" ? "text-blue-400" : "hover:text-blue-200"}
              >
                Oldest
              </button>
            </div>
          </div>

          {/* 댓글 입력 */}
          <div className="mb-12 flex gap-3">
            <input
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Tell your story..."
              className="flex-1 rounded-2xl bg-[#000d1a] border border-blue-900/20 px-6 py-4 text-sm text-white placeholder:text-blue-950 outline-none focus:border-blue-500 transition-all shadow-inner"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCommentSubmit();
                }
              }}
            />

            <button
              onClick={handleCommentSubmit}
              className="rounded-2xl bg-blue-600 px-8 font-black text-white transition-all hover:bg-blue-500 shadow-lg shadow-blue-600/20 active:scale-95"
            >
              POST
            </button>
          </div>

          {/* 댓글 리스트 */}
          <div className="flex flex-col gap-6">
            {comments.map((comment: any) => {
              const isMyComment = comment.author?.id === currentUserId;

              return (
                <div key={comment.id} className="group flex gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-950 border border-blue-900/30 font-black text-blue-400 text-xs shadow-inner">
                    {(comment.author?.name?.[0] || "?").toUpperCase()}
                  </div>

                  <div className="flex flex-1 flex-col rounded-3xl bg-[#000d1a]/40 border border-blue-900/10 p-6 transition-all hover:border-blue-500/20">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-white">
                          {comment.author?.name}
                        </span>

                        <span className="text-[10px] font-bold text-blue-900 uppercase">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {isMyComment && (
                        <div className="flex gap-3 text-[10px] font-black text-blue-900 uppercase">
                          <button
                            onClick={() =>
                              handleUpdateComment(comment.id, comment.content)
                            }
                            className="transition-colors hover:text-blue-400"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="transition-colors hover:text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>

                    <p className="text-[14px] leading-relaxed text-blue-100/60 font-medium">
                      {comment.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div ref={ref} className="h-20 w-full" />
        </div>
      </div>
    </div>
  );
}