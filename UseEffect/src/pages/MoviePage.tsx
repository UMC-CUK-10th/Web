import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import type { Movie, MovieResponse } from '../types/movie';

const MoviePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get<MovieResponse>(
        'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("데이터 호출 에러:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="p-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MoviePage;