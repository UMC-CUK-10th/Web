import { useState } from "react";
import MovieCard from "./MovieCard";
import useCustomFetch from "../hooks/useCustomFetch";

interface Movie {
  id: number;
  poster_path: string | null;
  overview: string;
  title: string;
}

interface MovieResponse {
  results: Movie[];
}

interface MovieListPageProps {
  title: string;
  endpoint: string;
}

function MovieListPage({ title, endpoint }: MovieListPageProps) {
  const [page, setPage] = useState(1);

  const { data, loading, error } = useCustomFetch<MovieResponse>(
    `https://api.themoviedb.org/3/movie/${endpoint}?language=ko-KR&page=${page}`
  );

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8">{title}</h1>

      {/* 페이지 버튼 */}
      <div className="flex justify-center gap-3 mb-8">
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              page === num ? "bg-blue-500 text-white" : "bg-white text-black"
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      {/* 로딩 */}
      {loading && (
        <div className="text-center text-xl font-semibold mb-6">
          로딩 중...
        </div>
      )}

      {/* 에러 */}
      {error && (
        <div className="text-center text-red-500 text-lg font-semibold mb-6">
          ⚠️ {error}
        </div>
      )}

      {/* 데이터 */}
      {!loading && !error && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
          {data?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}

export default MovieListPage;