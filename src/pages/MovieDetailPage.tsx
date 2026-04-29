import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LoadingSpinner } from '../components/LoadingSpinner';

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsPending(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );
        setMovie(res.data);
      } finally {
        setIsPending(false);
      }
    };
    fetchDetail();
  }, [movieId]);

  if (isPending) return <LoadingSpinner />;
  if (!movie) return <div className="text-white text-center p-10">영화를 찾을 수 없습니다.</div>;

  return (
    <div className="p-10 bg-black min-h-screen text-white flex flex-col md:flex-row gap-10">
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        className="w-full md:w-96 rounded-2xl shadow-2xl" 
        alt={movie.title}
      />
      <div className="flex-1">
        <h1 className="text-5xl font-black mb-4">{movie.title}</h1>
        <p className="text-green-400 text-xl font-bold mb-6">
          평점: ⭐ {movie.vote_average.toFixed(1)} | 개봉일: {movie.release_date}
        </p>
        <h2 className="text-2xl font-bold mb-2">줄거리</h2>
        <p className="text-gray-300 leading-relaxed text-lg">{movie.overview || "제공된 줄거리가 없습니다."}</p>
      </div>
    </div>
  );
};

export default MovieDetailPage;