import { useMemo, useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner.tsx";
import { useParams } from "react-router-dom";
import { useCustomFetch } from "../hooks/useCustomFetch";

export default function MoviePage() {
  const [page, setPage] = useState(1);
  const category = useParams<{ category: string }>();

  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
    }),
    []
  );

  const { data, isLoading, error } = useCustomFetch<MovieResponse>(
    category.category
      ? `https://api.themoviedb.org/3/movie/${category.category}`
      : null,
    {
      params: {
        language: "en-US",
        page,
      },
      headers,
      errorMessage: "영화 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
    }
  );

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="text-red-500 text-2xl">{error}</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center gap-6 mt-5">
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md 
          hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300 
          cursor-pointer disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >{`<`}</button>
        <span>{page} 페이지</span>
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md 
          hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer"
          onClick={() => setPage((prev) => prev + 1)}
        >{`>`}</button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 
        md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {data?.results.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
