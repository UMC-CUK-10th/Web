import { useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorDisplay from "../components/ErrorDisplay";
import useGetLpList from "../hooks/useGetLpList";

const HomePage = () => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const { data, isLoading, isError } = useGetLpList({
    order,
    cursor: 0,
    limit: 30,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorDisplay />;
  }

  return (
    <div className="p-8">
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          onClick={() => setOrder("asc")}
          className={`cursor-pointer rounded-md px-3 py-1 text-sm font-semibold transition-colors duration-200 ${
            order === "asc"
              ? "bg-gray-700 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          오래된순
        </button>

        <button
          onClick={() => setOrder("desc")}
          className={`cursor-pointer rounded-md px-3 py-1 text-sm font-semibold transition-colors duration-200 ${
            order === "desc"
              ? "bg-gray-700 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          최신순
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        {data?.data.data.map((lp) => (
          <Link
            to={`/lp/${lp.id}`}
            key={lp.id}
            className="group relative block overflow-hidden rounded-lg"
          >
            <img
              src={lp.thumbnail}
              alt={`${lp.title} LP 이미지`}
              className="aspect-square w-full rounded-lg object-cover transition-transform duration-200 group-hover:scale-110"
            />

            <div className="absolute inset-0 flex scale-110 flex-col justify-center rounded-lg bg-black/70 text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h3 className="mb-1 text-lg font-bold">{lp.title}</h3>
              <p>{new Date(lp.createdAt).toLocaleDateString()}</p>
              <p>{lp.likes.length}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
