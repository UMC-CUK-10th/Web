import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { deleteLpComment, updateLpComment } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";
import { useAuth } from "../context/auth-context";
import LpCommentForm from "./LpCommentForm.tsx";
import CommentSkeleton from "./LpCommentSkeleton.tsx";
import ErrorDisplay from "./ErrorDisplay.tsx";
import useGetLpComments from "../hooks/useGetLpComments";

interface Props {
  lpid: string;
}

const LpCommentSection = ({ lpid }: Props) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const [openMenuCommentId, setOpenMenuCommentId] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [commentActionError, setCommentActionError] = useState("");

  const {
    data: comments,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
  } = useGetLpComments(lpid, order);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  const invalidateComments = async () => {
    await queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.lpComments, lpid],
    });
  };

  const updateCommentMutation = useMutation({
    mutationFn: updateLpComment,
    onSuccess: async () => {
      setEditingCommentId(null);
      setEditingContent("");
      setCommentActionError("");
      await invalidateComments();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ??
          error.response?.data?.error ??
          "댓글 수정에 실패했습니다.";
        setCommentActionError(
          Array.isArray(message) ? message.join(", ") : String(message)
        );
        return;
      }

      setCommentActionError("댓글 수정에 실패했습니다.");
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: deleteLpComment,
    onSuccess: async () => {
      setOpenMenuCommentId(null);
      setCommentActionError("");
      await invalidateComments();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ??
          error.response?.data?.error ??
          "댓글 삭제에 실패했습니다.";
        setCommentActionError(
          Array.isArray(message) ? message.join(", ") : String(message)
        );
        return;
      }

      setCommentActionError("댓글 삭제에 실패했습니다.");
    },
  });

  if (isError) {
    return <ErrorDisplay />;
  }

  const commentList = comments?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <div className="mt-2 text-rose-900">
      <h2 className="mb-4 text-2xl font-bold text-rose-950">댓글</h2>
      <LpCommentForm lpid={lpid} />

      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          onClick={() => setOrder("asc")}
          className={`cursor-pointer rounded-md px-3 py-1 text-sm font-semibold transition-colors duration-200 ${
            order === "asc"
              ? "bg-rose-600 text-white"
              : "bg-rose-100 text-rose-700 hover:bg-rose-200"
          }`}
        >
          오래된순
        </button>
        <button
          onClick={() => setOrder("desc")}
          className={`cursor-pointer rounded-md px-3 py-1 text-sm font-semibold transition-colors duration-200 ${
            order === "desc"
              ? "bg-rose-600 text-white"
              : "bg-rose-100 text-rose-700 hover:bg-rose-200"
          }`}
        >
          최신순
        </button>
      </div>

      {isLoading && (
        <div className="space-y-4">
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
        </div>
      )}

      {commentActionError && (
        <p className="mb-4 text-sm text-red-500">{commentActionError}</p>
      )}

      <ul className="space-y-4">
        {!isLoading &&
          commentList.map((comment) => (
            <li
              key={comment.id}
              className="flex gap-3 rounded-2xl bg-rose-50 px-4 py-3 ring-1 ring-rose-100"
            >
              <img
                src={comment.author.avatar}
                alt="avatar"
                className="h-10 w-10 rounded-full border border-rose-200 bg-white object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-semibold text-rose-950">
                    {comment.author.name || "익명"}
                  </span>

                  {user?.id === comment.authorId && (
                    <div className="relative">
                      <button
                        type="button"
                        aria-label="댓글 메뉴 열기"
                        onClick={() =>
                          setOpenMenuCommentId((prev) =>
                            prev === comment.id ? null : comment.id
                          )
                        }
                        className="rounded-full px-2 py-1 text-lg leading-none text-rose-500 transition-colors hover:bg-rose-100 hover:text-rose-700"
                      >
                        ...
                      </button>

                      {openMenuCommentId === comment.id && (
                        <div className="absolute top-10 right-0 z-10 flex w-24 flex-col rounded-xl border border-rose-100 bg-white p-1 shadow-lg">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingCommentId(comment.id);
                              setEditingContent(comment.content);
                              setOpenMenuCommentId(null);
                              setCommentActionError("");
                            }}
                            className="rounded-lg px-3 py-2 text-left text-sm text-rose-700 transition-colors hover:bg-rose-50"
                          >
                            수정
                          </button>
                          <button
                            type="button"
                            onClick={async () => {
                              setCommentActionError("");
                              try {
                                await deleteCommentMutation.mutateAsync({
                                  lpid,
                                  commentId: comment.id,
                                });
                              } catch {
                                return;
                              }
                            }}
                            className="rounded-lg px-3 py-2 text-left text-sm text-red-500 transition-colors hover:bg-rose-50"
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {editingCommentId === comment.id ? (
                  <form
                    className="mt-2"
                    onSubmit={async (event) => {
                      event.preventDefault();
                      setCommentActionError("");

                      try {
                        await updateCommentMutation.mutateAsync({
                          lpid,
                          commentId: comment.id,
                          content: editingContent.trim(),
                        });
                      } catch {
                        return;
                      }
                    }}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <input
                        type="text"
                        value={editingContent}
                        onChange={(event) => setEditingContent(event.target.value)}
                        className="flex-1 rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm text-rose-950 focus:outline-none focus:ring-2 focus:ring-rose-300"
                      />
                      <button
                        type="submit"
                        disabled={
                          editingContent.trim().length === 0 ||
                          updateCommentMutation.isPending
                        }
                        className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        저장
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCommentId(null);
                          setEditingContent("");
                          setCommentActionError("");
                        }}
                        className="rounded-xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-100"
                      >
                        취소
                      </button>
                    </div>
                  </form>
                ) : (
                  <p className="mt-1 text-sm text-rose-900/75">{comment.content}</p>
                )}
              </div>
            </li>
          ))}
      </ul>

      <div ref={ref} className="mt-4 h-10">
        {isFetchingNextPage && <CommentSkeleton />}
      </div>
    </div>
  );
};

export default LpCommentSection;
