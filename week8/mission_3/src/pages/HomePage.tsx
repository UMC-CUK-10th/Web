import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { useAuth } from "../contexts/AuthContext";
import useGetLPList from "../hooks/queries/useGetLPList";
import useDebounce from "../hooks/useDebounce";
import useThrottle from "../hooks/useThrottle";
import CreateLPModal from "../components/CreateLPModal";

import api from "../apis/axios";

const HomePage = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ================= 검색 (Debounce) =================
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  // ================= Scroll (Throttle) =================
  const [scrollY, setScrollY] = useState(0);
  const throttledScrollY = useThrottle(scrollY, 200);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ================= 로그아웃 =================
  const { mutate: logoutMutate } = useMutation({
    mutationFn: async () => {
      await api.post("/v1/auth/logout");
    },
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      setUser(null);
      navigate("/login");
    },
  });

  // ================= LP 목록 =================
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetLPList(order, debouncedSearch);

  // ================= infinite scroll =================
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  // ================= flatten data =================
  const lps =
    data?.pages.flatMap((page: any) => page.data.data) ?? [];

  // ================= loading =================
  if (isLoading) {
    return (
      <div className="text-white flex justify-center items-center h-[300px]">
        로딩중...
      </div>
    );
  }

  // ================= error =================
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

      {/* ================= header ================= */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {user ? `${user.name}님 환영합니다` : "LP 목록"}
        </h1>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => setOrder("desc")}
            className={`px-4 py-2 rounded-md ${
              order === "desc"
                ? "bg-pink-500"
                : "border border-gray-500"
            }`}
          >
            최신순
          </button>

          <button
            onClick={() => setOrder("asc")}
            className={`px-4 py-2 rounded-md ${
              order === "asc"
                ? "bg-pink-500"
                : "border border-gray-500"
            }`}
          >
            오래된순
          </button>

          {user && (
            <button
              onClick={() => logoutMutate()}
              className="px-4 py-2 bg-red-500 rounded-md"
            >
              로그아웃
            </button>
          )}
        </div>
      </div>

      {/* ================= search ================= */}
      <div className="mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="LP 검색..."
          className="w-full px-4 py-2 rounded-md bg-white text-black border border-gray-300"
        />
      </div>

      {/* ================= throttle debug ================= */}
      <div className="fixed bottom-2 left-2 text-xs text-gray-400">
        scrollY: {throttledScrollY}
      </div>

      {/* ================= cards ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {lps.map((lp: any) => (
          <div
            key={lp.id}
            onClick={() => navigate(`/lp/${lp.id}`)}
            className="relative cursor-pointer overflow-hidden rounded-lg group"
          >
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full aspect-square object-cover group-hover:scale-105 transition"
            />

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-3">
              <h2 className="font-bold text-lg">{lp.title}</h2>
              <p>❤️ {lp.likes?.length}</p>
              <p className="text-sm text-gray-300">
                {new Date(lp.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= loading next ================= */}
      {isFetchingNextPage && (
        <div className="text-center text-gray-400 mt-5">
          로딩중...
        </div>
      )}

      {/* ================= observer ================= */}
      <div ref={observerRef} className="h-10" />

      {/* ================= floating button ================= */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-pink-500 text-white text-4xl shadow-lg hover:scale-110 transition"
      >
        +
      </button>

      {/* ================= modal ================= */}
      {isModalOpen && (
        <CreateLPModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default HomePage;