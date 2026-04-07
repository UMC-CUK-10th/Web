import { useParams } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';
import type { MovieDetail, CreditsResponse } from '../types/movies';
import { LoadingSpinner } from '../components/LoadingSpinner';

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const { data: movie, isPending: isMovieLoading } =
    useCustomFetch<MovieDetail>(`/movie/${movieId}?language=ko-KR`);
  const { data: credits, isPending: isCreditsLoading } =
    useCustomFetch<CreditsResponse>(`/movie/${movieId}/credits?language=ko-KR`);

  if (isMovieLoading || isCreditsLoading)
    return (
      <div className='flex justify-center py-20'>
        <LoadingSpinner />
      </div>
    );
  if (!movie)
    return (
      <div className='text-white text-center py-20'>
        영화를 찾을 수 없습니다.
      </div>
    );

  return (
    <div className='bg-black text-white min-h-screen'>
      <div
        className='relative h-[60vh] bg-cover bg-center'
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className='absolute bottom-10 left-10 max-w-3xl animate-fadeIn'>
          <h1 className='text-6xl font-black mb-4 tracking-tighter'>
            {movie.title}
          </h1>
          <div className='flex gap-4 items-center text-lg font-semibold text-green-400 mb-6'>
            <span>평점 {movie.vote_average.toFixed(1)}</span>
            <span className='text-gray-500'>|</span>
            <span>{movie.release_date.split('-')[0]}</span>
            <span className='text-gray-500'>|</span>
            <span>{movie.runtime}분</span>
          </div>
          <p className='text-xl italic text-gray-300 mb-6'>"{movie.tagline}"</p>
          <p className='text-lg leading-relaxed text-gray-200 line-clamp-3 bg-black/30 p-4 rounded-lg'>
            {movie.overview}
          </p>
        </div>
      </div>

      <div className='px-10 py-16'>
        <h2 className='text-3xl font-bold mb-10 border-l-4 border-[#b2dab1] pl-4'>
          감독/출연
        </h2>
        <div className='flex gap-8 overflow-x-auto pb-8 scrollbar-hide'>
          {credits?.cast.slice(0, 15).map((person) => (
            <div key={person.id} className='flex-shrink-0 w-32 group'>
              <div className='w-32 h-32 rounded-full overflow-hidden border-2 border-gray-800 group-hover:border-[#b2dab1] transition-all duration-300 shadow-xl'>
                <img
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                      : 'https://via.placeholder.com/200'
                  }
                  alt={person.name}
                  className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                />
              </div>
              <p className='mt-4 text-center font-bold text-sm truncate'>
                {person.name}
              </p>
              <p className='text-center text-xs text-gray-500 truncate'>
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
