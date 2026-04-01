import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import type { MovieDetail, Credits } from '../types/movie';
import LoadingSpinner from '../components/LoadingSpinner';

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [detail, setDetail] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsPending(true);
      setIsError(false);
      try {
        const [detailRes, creditsRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` }
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`, {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` }
          })
        ]);
        setDetail(detailRes.data);
        setCredits(creditsRes.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovieData();
  }, [movieId]);

  if (isPending) return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
  if (isError) return <div className="text-red-500 p-10 text-center">데이터 호출 에러 발생</div>;
  if (!detail) return null;

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10 mb-16">
        <img 
          src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`} 
          alt={detail.title} 
          className="w-full md:w-80 rounded-2xl shadow-xl"
        />
        <div className="flex-1 text-black">
          <h1 className="text-4xl font-bold mb-2">{detail.title}</h1>
          <p className="text-gray-400 italic mb-4">"{detail.tagline}"</p>
          <div className="flex gap-4 mb-6">
            <span className="text-yellow-500 font-bold">★ {detail.vote_average.toFixed(1)}</span>
            <span className="text-gray-400">{detail.release_date}</span>
            <span className="text-gray-400">{detail.runtime}분</span>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">줄거리</h2>
            <p className="text-gray-700 leading-relaxed">{detail.overview || "정보 없음"}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">출연진</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {credits?.cast.slice(0, 12).map((person) => (
            <div key={person.id} className="text-center">
              <div className="aspect-square rounded-full overflow-hidden bg-gray-100 mb-2">
                {person.profile_path ? (
                  <img src={`https://image.tmdb.org/t/p/w200${person.profile_path}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                )}
              </div>
              <p className="text-sm font-bold truncate">{person.name}</p>
              <p className="text-xs text-gray-500 truncate">{person.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;