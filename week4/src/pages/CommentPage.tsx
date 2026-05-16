import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CommentCard from "../components/LpCard/CommentCard";
import CommentSkeletonList from "../components/LpCard/CommentSkeletonList";
import useGetInfiniteComment from "../hooks/queries/useGetInfiniteComment";
import usePostComment from "../hooks/mutations/usePostComment";
import type { PaginationDto } from "../types/common";
import type { CommentItem } from "../types/comment";
import { getMyInfo } from "../apis/auth";
import { QUERY_KEY } from "../constants/key";
import { useAuth } from "../context/AuthContext";

const CommentPage = () => {
  const navigate = useNavigate();
  const { lpid } = useParams();
  const { accessToken } = useAuth();

  const [order, setOrder] = useState<PaginationDto["order"]>("desc");
  const [comment, setComment] = useState("");

  const numericLpId = lpid ? Number(lpid) : undefined;

  const {
    data: comments,
    isLoading: commentsLoading,
    isFetching: commentsFetching,
    hasNextPage: commentsHasNextPage,
    fetchNextPage: commentsFetchNextPage,
  } = useGetInfiniteComment(numericLpId, 10, order);

  const { data: myInfo } = useQuery({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: getMyInfo,
    enabled: Boolean(accessToken),
  });

  const currentUserId = myInfo?.data?.id;

  const { mutate: postCommentMutate, isPending: isPosting } =
    usePostComment(numericLpId ?? 0);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !commentsFetching && commentsHasNextPage) {
      commentsFetchNextPage();
    }
  }, [inView, commentsFetching, commentsHasNextPage, commentsFetchNextPage]);

  const commentList: CommentItem[] =
    comments?.pages.map((page) => page.data.data).flat() ?? [];

  const isCommentEmpty = comment.trim().length === 0;

  const handleSubmitComment = () => {
    if (!numericLpId) {
      alert("LP 정보를 찾을 수 없습니다.");
      return;
    }

    if (isCommentEmpty || isPosting) return;

    postCommentMutate(comment.trim(), {
      onSuccess: () => {
        setComment("");
      },
    });
  };

  return (
    <div className="w-full bg-white text-gray-800">
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50"
        >
          ←
        </button>

        <h2 className="text-xl font-bold text-gray-900">댓글</h2>

        <div className="w-10" />
      </div>

      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          댓글을 최신순 또는 오래된순으로 확인해보세요.
        </p>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            className={`h-9 rounded-xl border px-3 text-sm font-medium transition ${
              order === "asc"
                ? "border-pink-500 bg-pink-500 text-white"
                : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setOrder("asc")}
          >
            오래된순
          </button>

          <button
            type="button"
            className={`h-9 rounded-xl border px-3 text-sm font-medium transition ${
              order === "desc"
                ? "border-pink-500 bg-pink-500 text-white"
                : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setOrder("desc")}
          >
            최신순
          </button>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-gray-200 bg-[#fafafa] p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmitComment();
              }
            }}
            placeholder="댓글을 작성해주세요..."
            className="h-11 flex-1 rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
          />

          <button
            type="button"
            onClick={handleSubmitComment}
            disabled={isCommentEmpty || isPosting}
            className={`h-11 rounded-xl px-5 text-sm font-semibold transition ${
              isCommentEmpty || isPosting
                ? "cursor-not-allowed bg-gray-200 text-gray-400"
                : "bg-pink-500 text-white hover:bg-pink-600"
            }`}
          >
            {isPosting ? "작성 중..." : "작성"}
          </button>
        </div>

        {isCommentEmpty && (
          <p className="mt-2 text-xs text-gray-400">
            댓글을 입력하면 작성 버튼이 활성화됩니다.
          </p>
        )}
      </div>

      <div className="max-h-[420px] overflow-y-auto rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        {commentsLoading && (
          <div className="flex flex-col gap-3">
            <CommentSkeletonList count={10} />
          </div>
        )}

        {!commentsLoading && commentList.length > 0 && (
          <div className="flex flex-col gap-4">
            {commentList.map((commentItem) => (
              <CommentCard
                key={commentItem.id}
                id={commentItem.id}
                content={commentItem.content}
                author={commentItem.author}
                lpId={numericLpId ?? 0}
                currentUserId={currentUserId}
              />
            ))}

            {commentsFetching && (
              <div className="mt-4">
                <CommentSkeletonList count={3} />
              </div>
            )}

            <div ref={ref} className="h-2" />
          </div>
        )}

        {!commentsLoading && commentList.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500">
            아직 등록된 댓글이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentPage;