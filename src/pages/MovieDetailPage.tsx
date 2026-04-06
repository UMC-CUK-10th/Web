import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import type { MovieDetail, CreditsResponse, Cast } from '../types/movies';
import { LoadingSpinner } from '../components/LoadingSpinner';

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsPending(true);
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        };

        const [detailRes, creditsRes] = await Promise.all([
          axios.get<MovieDetail>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            options,
          ),
          axios.get<CreditsResponse>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            options,
          ),
        ]);

        setMovie(detailRes.data);
        setCast(creditsRes.data.cast);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  if (isPending)
    return (
      <div className='flex justify-center py-20'>
        <LoadingSpinner />
      </div>
    );
  if (isError || !movie)
    return (
      <div className='text-red-500 text-center py-20'>
        데이터를 불러오지 못했습니다.
      </div>
    );

  return (
    <div className='bg-black text-white min-h-screen'>
      <div
        className='relative h-[500px] bg-cover bg-center'
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className='absolute bottom-10 left-10 max-w-2xl'>
          <h1 className='text-5xl font-bold mb-2'>{movie.title}</h1>
          <div className='flex gap-4 text-gray-300 mb-4'>
            <span>평점 {movie.vote_average.toFixed(1)}</span>
            <span>{movie.release_date.split('-')[0]}</span>
            <span>{movie.runtime}분</span>
          </div>
          <p className='italic text-xl text-gray-400 mb-4'>"{movie.tagline}"</p>
          <p className='line-clamp-4 leading-relaxed'>{movie.overview}</p>
        </div>
      </div>

      <div className='p-10'>
        <h2 className='text-2xl font-bold mb-8'>감독/출연</h2>
        <div className='flex gap-6 overflow-x-auto pb-4 scrollbar-hide'>
          {cast.slice(0, 15).map((person) => (
            <div key={person.id} className='flex-shrink-0 w-32 text-center'>
              <div className='w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-gray-700 mb-2'>
                <img
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                      : 'https://via.placeholder.com/200x200?text=No+Image'
                  }
                  alt={person.name}
                  className='w-full h-full object-cover'
                />
              </div>
              <p className='text-sm font-bold truncate'>{person.name}</p>
              <p className='text-xs text-gray-500 truncate'>
                {person.character}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
