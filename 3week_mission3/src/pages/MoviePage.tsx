import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Movie, MovieResponse } from '../types/movie';

const MoviePage = () => {
  const { category } = useParams<{ category: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);

  const fetchMovies = async () => {
    setIsPending(true);
    setIsError(false);
    try {
      const response = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchMovies();
    window.scrollTo(0, 0);
  }, [category, page]);

  if (isError) return <div className="text-red-500 p-10">에러 발생</div>;

  return (
    <div className="p-6">
      <div className="flex justify-center items-center gap-4 mb-10">
        <button 
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-lg disabled:opacity-30 cursor-pointer"
        >
          {"<"}
        </button>
        <span className="font-medium text-lg">{page} 페이지</span>
        <button 
          onClick={() => setPage(p => p + 1)}
          className="w-12 h-12 flex items-center justify-center bg-[#D8B4FE] text-white rounded-lg hover:bg-purple-400 cursor-pointer"
        >
          {">"}
        </button>
      </div>

      {isPending ? (
        <div className="flex justify-center items-center h-[50vh]">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviePage;