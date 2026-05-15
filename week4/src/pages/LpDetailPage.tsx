import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteLp, likeLp, unlikeLp } from "../apis/lp";
import LpCreateModal from "../components/LpCreateModal";
import useGetLpDetail from "../hooks/useGetLpDetail";
import { QUERY_KEY } from "../constants/key";
import { useAuth } from "../context/auth-context";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorDisplay from "../components/ErrorDisplay";
import LpCommentSection from "../components/LpCommentSection";
import type { Likes, LpDetail } from "../types/lp";

type LpDetailQueryData = { data: LpDetail };
type LikeMutationContext = { previousLpDetail?: LpDetailQueryData };

const LpDetailPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { lpid } = useParams<{ lpid: string }>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [actionError, setActionError] = useState("");
  const { data, isLoading, isError } = useGetLpDetail(lpid);

  const invalidateLpQueries = async () => {
    await queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.lps],
    });
    if (lpid) {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, lpid],
      });
    }
  };

  const deleteLpMutation = useMutation({
    mutationFn: deleteLp,
    onSuccess: async () => {
      await invalidateLpQueries();
      navigate("/", { replace: true });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ??
          error.response?.data?.error ??
          "LP 삭제에 실패했습니다.";
        setActionError(Array.isArray(message) ? message.join(", ") : String(message));
        return;
      }

      setActionError("LP 삭제에 실패했습니다.");
    },
  });

  const likeMutation = useMutation({
    mutationFn: likeLp,
    onMutate: async (targetLpId) => {
      if (!user) {
        return {};
      }

      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, targetLpId],
      });

      const previousLpDetail = queryClient.getQueryData<LpDetailQueryData>([
        QUERY_KEY.lps,
        targetLpId,
      ]);

      queryClient.setQueryData<LpDetailQueryData>(
        [QUERY_KEY.lps, targetLpId],
        (oldData) => {
          if (!oldData?.data) {
            return oldData;
          }

          const alreadyLiked = oldData.data.likes.some(
            (like) => like.userId === user.id
          );

          if (alreadyLiked) {
            return oldData;
          }

          const optimisticLike: Likes = {
            id: Date.now(),
            userId: user.id,
            lpId: oldData.data.id,
          };

          return {
            ...oldData,
            data: {
              ...oldData.data,
              likes: [...oldData.data.likes, optimisticLike],
            },
          };
        }
      );

      return { previousLpDetail };
    },
    onError: (error, targetLpId, context: LikeMutationContext | undefined) => {
      if (context?.previousLpDetail) {
        queryClient.setQueryData([QUERY_KEY.lps, targetLpId], context.previousLpDetail);
      }

      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ??
          error.response?.data?.error ??
          "좋아요 처리에 실패했습니다.";
        setActionError(Array.isArray(message) ? message.join(", ") : String(message));
        return;
      }

      setActionError("좋아요 처리에 실패했습니다.");
    },
    onSettled: async () => {
      await invalidateLpQueries();
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: unlikeLp,
    onMutate: async (targetLpId) => {
      if (!user) {
        return {};
      }

      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, targetLpId],
      });

      const previousLpDetail = queryClient.getQueryData<LpDetailQueryData>([
        QUERY_KEY.lps,
        targetLpId,
      ]);

      queryClient.setQueryData<LpDetailQueryData>(
        [QUERY_KEY.lps, targetLpId],
        (oldData) => {
          if (!oldData?.data) {
            return oldData;
          }

          return {
            ...oldData,
            data: {
              ...oldData.data,
              likes: oldData.data.likes.filter((like) => like.userId !== user.id),
            },
          };
        }
      );

      return { previousLpDetail };
    },
    onError: (error, targetLpId, context: LikeMutationContext | undefined) => {
      if (context?.previousLpDetail) {
        queryClient.setQueryData([QUERY_KEY.lps, targetLpId], context.previousLpDetail);
      }

      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ??
          error.response?.data?.error ??
          "좋아요 취소에 실패했습니다.";
        setActionError(Array.isArray(message) ? message.join(", ") : String(message));
        return;
      }

      setActionError("좋아요 취소에 실패했습니다.");
    },
    onSettled: async () => {
      await invalidateLpQueries();
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorDisplay />;

  const lp = data?.data;

  if (!lp || !lp.author) {
    return (
      <div className="py-10 text-center text-red-500">
        데이터를 불러올 수 없습니다.
      </div>
    );
  }

  const isAuthor = user?.id === lp.authorId;
  const isLiked = !!user && lp.likes.some((like) => like.userId === user.id);
  const isLikePending = likeMutation.isPending || unlikeMutation.isPending;

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <div className="overflow-hidden rounded-[32px] bg-white/75 p-6 text-rose-950 shadow-xl ring-1 ring-rose-200 backdrop-blur sm:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img
              src={lp.author.avatar}
              alt="작성자 아바타"
              className="h-11 w-11 rounded-full border border-rose-200 object-cover"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-rose-400">
                Creator
              </p>
              <span className="text-base font-semibold text-rose-950">
                {lp.author.name}
              </span>
            </div>
          </div>

          {isAuthor && (
            <div className="flex items-center gap-3 text-sm font-semibold text-rose-700">
              <button
                type="button"
                onClick={() => {
                  setActionError("");
                  setIsEditModalOpen(true);
                }}
                className="cursor-pointer rounded-full border border-rose-300 bg-white/80 px-4 py-2 transition-colors hover:border-rose-500 hover:text-rose-600"
              >
                수정
              </button>
              <button
                type="button"
                onClick={() => {
                  setActionError("");
                  setIsDeleteModalOpen(true);
                }}
                className="cursor-pointer rounded-full border border-rose-300 bg-white/80 px-4 py-2 transition-colors hover:border-rose-500 hover:text-rose-600"
              >
                삭제
              </button>
            </div>
          )}
        </div>

        <div className="mb-6 space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose-400">
            LP Detail
          </p>
          <h1 className="text-3xl font-black leading-tight text-rose-950 sm:text-4xl">
            {lp.title}
          </h1>
          <p className="text-sm text-rose-900/60">
            {new Date(lp.createdAt).toLocaleDateString()}
          </p>
        </div>

        <img
          src={lp.thumbnail}
          alt="lp 썸네일"
          className="mb-6 aspect-square w-full rounded-[28px] border border-rose-200 bg-rose-50 object-cover shadow-md"
        />

        <div className="mb-8 flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-rose-100 via-pink-100 to-orange-100 py-4">
          <button
            type="button"
            disabled={!user || isLikePending}
            onClick={async () => {
              if (!lpid || !user) {
                return;
              }

              setActionError("");

              try {
                if (isLiked) {
                  await unlikeMutation.mutateAsync(lpid);
                  return;
                }

                await likeMutation.mutateAsync(lpid);
              } catch {
                return;
              }
            }}
            className="text-3xl transition-transform hover:scale-125 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span aria-hidden="true">❤️</span>
          </button>
          <span className="text-lg font-bold text-rose-900">
            {lp.likes.length}
          </span>
        </div>

        {actionError && <p className="mb-6 text-sm text-red-500">{actionError}</p>}

        <div className="rounded-[28px] bg-rose-50/80 p-5 ring-1 ring-rose-100">
          <h2 className="mb-3 text-lg font-bold text-rose-950">소개</h2>
          <p className="whitespace-pre-wrap leading-7 text-rose-900/75">
            {lp.content}
          </p>
        </div>

        <div className="mt-10 rounded-[28px] bg-white/70 p-5 ring-1 ring-rose-100">
          <LpCommentSection lpid={lpid ?? ""} />
        </div>
      </div>

      <LpCreateModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        mode="edit"
        lpid={lpid}
        initialData={lp}
      />

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-rose-950/45 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[28px] bg-white p-6 shadow-2xl ring-1 ring-rose-100">
            <h2 className="text-xl font-black text-rose-950">정말 삭제하시겠습니까?</h2>
            <p className="mt-3 text-sm text-rose-900/70">
              삭제하면 이 LP와 연결된 데이터가 함께 사라질 수 있습니다.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 rounded-2xl border border-rose-200 px-4 py-3 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-50"
              >
                취소
              </button>
              <button
                type="button"
                disabled={deleteLpMutation.isPending || !lpid}
                onClick={async () => {
                  if (!lpid) {
                    return;
                  }

                  setActionError("");

                  try {
                    await deleteLpMutation.mutateAsync(lpid);
                  } catch {
                    return;
                  }
                }}
                className="flex-1 rounded-2xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleteLpMutation.isPending ? "삭제 중..." : "삭제"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LpDetailPage;
