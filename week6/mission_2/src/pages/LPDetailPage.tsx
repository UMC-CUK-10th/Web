import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import useGetLPDetail from "../hooks/queries/useGetLPDetail";
import useComments from "../hooks/queries/useComments";

import CommentSkeleton from "../components/skeleton/CommentSkeleton";

const LPDetailPage = () => {
  const { lpid } = useParams();

  const [order, setOrder] = useState<"asc" | "desc">("desc");

  // ================= LP =================
  const { data, isLoading, isError, refetch } = useGetLPDetail(lpid!);

  // ================= 댓글 =================
  const {
    data: commentData,
    fetchNextPage,
    hasNextPage,
    isLoading: commentLoading,
    isFetchingNextPage,
  } = useComments(lpid!, order);

  const comments =
    commentData?.pages.flatMap((p: any) => p.data.data) ?? [];

  // ================= observer =================
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <div className="animate-spin h-20 w-20 border-b-2 border-pink-500 rounded-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] text-white">
        <p>에러가 발생했습니다.</p>
        <button onClick={() => refetch()} className="px-4 py-2 bg-pink-500">
          다시 시도
        </button>
      </div>
    );
  }

  const lp = data?.data;

  return (
    <div className="text-white max-w-[1200px] mx-auto">

      {/* ================= LP ================= */}
      <div className="grid md:grid-cols-2 gap-10">
        <img src={lp.thumbnail} className="w-full rounded-xl" />

        <div>
          <h1 className="text-4xl font-bold">{lp.title}</h1>

          <p className="text-gray-400 mt-2">
            {new Date(lp.createdAt).toLocaleDateString()}
          </p>

          <p className="text-pink-400 mt-2">
            ❤️ {lp.likes?.length}
          </p>

          <p className="mt-5">{lp.content}</p>

          {/* 버튼 */}
          <div className="flex gap-3 mt-8">
            <button className="px-4 py-2 bg-blue-500 rounded-md">
              수정
            </button>

            <button className="px-4 py-2 bg-red-500 rounded-md">
              삭제
            </button>

            <button className="px-4 py-2 bg-pink-500 rounded-md">
              좋아요
            </button>
          </div>
        </div>
      </div>

      {/* ================= 댓글 ================= */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-5">댓글</h2>

        {/* 정렬 */}
        <div className="flex gap-3 mb-5">
          <button
            onClick={() => setOrder("desc")}
            className="px-3 py-1 bg-pink-500 rounded"
          >
            최신순
          </button>

          <button
            onClick={() => setOrder("asc")}
            className="px-3 py-1 border rounded"
          >
            오래된순
          </button>
        </div>

        {/* ================= 댓글 입력 UI ================= */}
        <div className="mb-5">
          <input
            className="w-full p-2 text-black"
            placeholder="댓글 입력"
          />
          <button className="mt-2 px-4 py-2 bg-pink-500">
            작성
          </button>
        </div>

        {/* ================= 1️⃣ 초기 로딩 Skeleton (핵심 수정) ================= */}
        {commentLoading && comments.length === 0 && (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <CommentSkeleton key={i} />
            ))}
          </div>
        )}

        {/* ================= 댓글 리스트 ================= */}
        <div className="flex flex-col gap-3">
          {comments.map((c: any) => (
            <div key={c.id} className="border-b py-3">
              <p>{c.content}</p>
            </div>
          ))}
        </div>

        {/* observer */}
        <div ref={observerRef} className="h-10" />

        {/* ================= 2️⃣ 추가 로딩 Skeleton ================= */}
        {isFetchingNextPage && (
          <div className="flex flex-col gap-3 mt-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <CommentSkeleton key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LPDetailPage;