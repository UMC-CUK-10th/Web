import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  poster_path: string | null;
  overview: string;
  title: string;
}

interface MovieListPageProps {
  title: string;
  endpoint: string;
}

function MovieListPage({ title, endpoint }: MovieListPageProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const token = import.meta.env.VITE_TMDB_KEY;

        if (!token) {
          throw new Error("TMDB 토큰이 없습니다.");
        }

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${endpoint}?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.status_message || "영화 데이터를 불러오지 못했습니다."
          );
        }

        setMovies(data.results);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [endpoint, page]);

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8">{title}</h1>

      <div className="flex justify-center gap-3 mb-8">
        <button
          onClick={() => setPage(1)}
          className={`px-4 py-2 rounded-lg font-semibold ${
            page === 1 ? "bg-blue-500 text-white" : "bg-white text-black"
          }`}
        >
          1
        </button>

        <button
          onClick={() => setPage(2)}
          className={`px-4 py-2 rounded-lg font-semibold ${
            page === 2 ? "bg-blue-500 text-white" : "bg-white text-black"
          }`}
        >
          2
        </button>

        <button
          onClick={() => setPage(3)}
          className={`px-4 py-2 rounded-lg font-semibold ${
            page === 3 ? "bg-blue-500 text-white" : "bg-white text-black"
          }`}
        >
          3
        </button>
      </div>

      {loading && (
        <div className="text-center text-xl font-semibold mb-6">로딩 중...</div>
      )}

      {error && (
        <div className="text-center text-red-500 text-lg font-semibold mb-6">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}

export default MovieListPage;