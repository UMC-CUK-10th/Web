import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import useGetLPDetail from "../hooks/queries/useGetLPDetail";
import useComments from "../hooks/queries/useComments";

import {
  createComment,
  updateComment,
  deleteComment,
} from "../apis/comment";

import { updateLP, deleteLP, createLike } from "../apis/lp";

import { useAuth } from "../contexts/AuthContext";

const LPDetailPage = () => {
  const { lpid } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [order] = useState<"asc" | "desc">("desc");

  const [comment, setComment] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data, isLoading, isError, refetch } = useGetLPDetail(lpid!);
  const lp = data?.data;

  // ✅ 작성자 기준
  const isOwner = user?.id === lp?.author?.id;

  const {
    data: commentData,
    fetchNextPage,
    hasNextPage,
  } = useComments(lpid!, order);

  const comments =
    commentData?.pages.flatMap((p: any) => p.data.data) ?? [];

  // ================= LP 수정 =================
  const { mutate: updateLPMutate } = useMutation({
    mutationFn: updateLP,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lp", lpid] });
      setIsEditOpen(false);
    },
  });

  // ================= LP 삭제 =================
  const { mutate: deleteLPMutate } = useMutation({
    mutationFn: deleteLP,
    onSuccess: () => navigate("/"),
  });

  // ================= LIKE =================
  const { mutate: likeMutate } = useMutation({
    mutationFn: createLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lp", lpid] });
    },
  });

  // ================= COMMENT =================
  const { mutate: createCommentMutate } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpid, order] });
    },
  });

  const { mutate: updateCommentMutate } = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      setEditingId(null);
      setEditContent("");
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpid, order] });
    },
  });

  const { mutate: deleteCommentMutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpid, order] });
    },
  });

  // ================= infinite scroll =================
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <div className="text-white">로딩중...</div>;

  if (isError)
    return (
      <div className="text-white">
        <button onClick={() => refetch()}>재시도</button>
      </div>
    );

  return (
    <div className="text-white max-w-[1200px] mx-auto pb-20">

      {/* ================= LP 영역 (이미지 + 내용) ================= */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* 이미지 */}
        <img
          src={lp.thumbnail}
          className="w-full rounded-xl object-cover"
        />

        {/* 내용 */}
        <div>
          <h1 className="text-4xl font-bold">{lp.title}</h1>

          <p className="text-pink-400 mt-2">
            ❤️ {lp.likes?.length}
          </p>

          <p className="mt-5 text-gray-200 leading-7">
            {lp.content}
          </p>

          {/* ================= LP 버튼 (본인만) ================= */}
          {isOwner && (
            <div className="flex gap-3 mt-6">

              <button
                onClick={() => {
                  setTitle(lp.title);
                  setContent(lp.content);
                  setIsEditOpen(true);
                }}
                className="px-4 py-2 bg-blue-500 rounded"
              >
                수정
              </button>

              <button
                onClick={() => deleteLPMutate(Number(lpid))}
                className="px-4 py-2 bg-red-500 rounded"
              >
                삭제
              </button>

            </div>
          )}

          {/* 좋아요 (전체 가능) */}
          <button
            onClick={() => likeMutate(Number(lpid))}
            className="mt-4 px-4 py-2 bg-pink-500 rounded"
          >
            좋아요
          </button>
        </div>
      </div>

      {/* ================= LP 수정 모달 ================= */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#181818] p-6 rounded-xl w-[400px]">

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mb-2 bg-black"
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 mb-2 bg-black"
            />

            <button
              onClick={() =>
                updateLPMutate({
                  lpId: Number(lpid),
                  title,
                  content,
                })
              }
              className="bg-pink-500 px-4 py-2"
            >
              저장
            </button>

          </div>
        </div>
      )}

      {/* ================= 댓글 ================= */}
      <div className="mt-20">
        <h2 className="text-2xl mb-5">댓글</h2>

        {/* 댓글 작성 */}
        <div className="mb-6">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 bg-[#111] rounded"
          />

          <button
            onClick={() =>
              createCommentMutate({
                lpId: Number(lpid),
                content: comment,
              })
            }
            className="mt-2 px-4 py-2 bg-pink-500 rounded"
          >
            작성
          </button>
        </div>

        {/* 댓글 리스트 */}
        {comments.map((c: any) => {
          const isMine = user?.id === c.author?.id;

          return (
            <div key={c.id} className="p-4 bg-[#181818] mb-3">

              {/* 작성자 */}
              <p className="font-bold">
                {c.author?.name}
              </p>

              {/* 수정 상태 */}
              {editingId === c.id ? (
                <>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-2 bg-black mt-2"
                  />

                  <button
                    onClick={() =>
                      updateCommentMutate({
                        lpId: Number(lpid),
                        commentId: c.id,
                        content: editContent,
                      })
                    }
                    className="mt-2 px-3 py-1 bg-pink-500"
                  >
                    저장
                  </button>
                </>
              ) : (
                <p className="mt-2 text-gray-200">{c.content}</p>
              )}

              {/* 본인 댓글만 버튼 */}
              {isMine && (
                <div className="flex gap-2 mt-2">

                  <button
                    onClick={() => {
                      setEditingId(c.id);
                      setEditContent(c.content);
                    }}
                  >
                    수정
                  </button>

                  <button
                    onClick={() =>
                      deleteCommentMutate({
                        lpId: Number(lpid),
                        commentId: c.id,
                      })
                    }
                  >
                    삭제
                  </button>

                </div>
              )}
            </div>
          );
        })}
      </div>

      <div ref={observerRef} />
    </div>
  );
};

export default LPDetailPage;