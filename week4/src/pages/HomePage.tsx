import { useState } from "react";
import useGetLpList from "../hooks/useGetLplist";
import Lp from "../components/Lp";

function HomePage() {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const { data, isPending, isError } = useGetLpList({
    search,
    order,
    sort: "createdAt",
  });

  if (isPending) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#fafafa] text-xl font-medium text-gray-500">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#fafafa] text-xl font-medium text-red-500">
        Error.
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#fafafa] px-6 py-8 text-gray-800">
      <div className="mx-auto max-w-6xl">
        <section className="mb-8 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="LP 제목을 검색해보세요"
            className="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100 sm:max-w-sm"
          />

          <div className="flex gap-2">
            <button
              type="button"
              className={`h-10 rounded-xl border px-4 text-sm font-medium transition ${
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
              className={`h-10 rounded-xl border px-4 text-sm font-medium transition ${
                order === "desc"
                  ? "border-pink-500 bg-pink-500 text-white"
                  : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setOrder("desc")}
            >
              최신순
            </button>
          </div>
        </section>

        {data && data.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {data.map((lp) => (
              <Lp key={lp.id} lp={lp} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center text-gray-500 shadow-sm">
            등록된 LP가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;