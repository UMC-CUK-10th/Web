import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import useGetLPList from "../hooks/queries/useGetLPList";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetLPList(order);

  // 📌 observer
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
    };
  }, [hasNextPage, fetchNextPage]);

  // 📌 핵심: 서버 구조 기준 flatten
  const lps =
    data?.pages.flatMap((page: any) => page.data.data) ?? [];

  // 📌 로딩
  if (isLoading) {
    return (
      <div className="text-white flex justify-center items-center h-[300px]">
        로딩중...
      </div>
    );
  }

  // 📌 에러
  if (isError) {
    return (
      <div className="text-white flex flex-col items-center gap-4">
        <p>에러가 발생했습니다.</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-pink-500 rounded"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="text-white">
      {/* 상단 */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {user ? `${user.name}님 환영합니다` : "LP 목록"}
        </h1>

        {/* 정렬 */}
        <div className="flex gap-3">
          <button
            onClick={() => setOrder("desc")}
            className="px-4 py-2 bg-pink-500 rounded-md"
          >
            최신순
          </button>

          <button
            onClick={() => setOrder("asc")}
            className="px-4 py-2 border rounded-md"
          >
            오래된순
          </button>
        </div>
      </div>

      {/* 카드 목록 */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {lps.map((lp: any) => (
          <div
            key={lp.id}
            onClick={() => navigate(`/lp/${lp.id}`)}
            className="relative cursor-pointer overflow-hidden group"
          >
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full aspect-square object-cover transition group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-3">
              <h2 className="font-bold">{lp.title}</h2>
              <p>❤️ {lp.likes?.length}</p>
              <p>
                {new Date(lp.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 추가 로딩 */}
      {isFetchingNextPage && (
        <div className="text-center text-gray-400 mt-5">
          로딩중...
        </div>
      )}

      {/* observer trigger */}
      <div ref={observerRef} className="h-10" />
    </div>
  );
};

export default HomePage;