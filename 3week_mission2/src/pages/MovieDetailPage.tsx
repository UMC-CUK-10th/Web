import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Movie } from '../types/movie';

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` }
        });
        setMovie(response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [movieId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-red-500 text-xl font-bold">영화를 불러오는 중 에러가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="p-10 flex flex-col md:flex-row gap-10 animate-in fade-in duration-500">
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title} 
        className="w-full md:w-96 rounded-2xl shadow-2xl object-cover"
      />
      <div className="text-black flex-1">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">{movie.title}</h1>
        <div className="flex items-center gap-4 mb-6">
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-bold">
            평점 ★ {movie.vote_average.toFixed(1)}
          </span>
          <span className="text-gray-500 font-medium">{movie.release_date} 개봉</span>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">줄거리</h2>
          <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
            {movie.overview || "등록된 줄거리가 없습니다."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;