import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList"; 
import { MovieModal } from "../components/MovieModal"; 
import useFetch from "../hooks/useFetch";
import type { MovieFilters, MovieReaponse, Movie } from "../types/movies";

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const axiosRequestConfig = useMemo(() => ({
    params: filters,
  }), [filters.query, filters.include_adult, filters.language]);

  const { data, error, isLoading } = useFetch<MovieReaponse>(
    "/search/movie",
    axiosRequestConfig,
  );

  const handleChangeFilters = useCallback((nextFilters: MovieFilters) => {
    setFilters(nextFilters);
  }, []);
  const handleOpenModal = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  if (error) {
    return <div className="text-red-500 font-bold p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <MovieFilter onChange={handleChangeFilters} />
      
      {isLoading ? (
        <div className="text-center py-10 text-gray-500 font-medium">로딩 중 입니다...</div>
      ) : (
        <MovieList movies={data?.results || []} onMovieClick={handleOpenModal} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}