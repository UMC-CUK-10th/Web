import { useParams } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';
import MovieCard from '../components/MovieCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { MovieResponse } from '../types/movies';
import { useState } from 'react';

export default function MoviePage() {
  const [page, setPage] = useState(1);
  const { category = 'popular' } = useParams<{ category: string }>();

  const { data, isPending, isError } = useCustomFetch<MovieResponse>(
    `/movie/${category}?language=ko-KR&page=${page}`,
  );

  if (isError)
    return (
      <div className='text-red-500 text-center py-20'>
        에러가 발생했습니다. 😥
      </div>
    );

  return (
    <div className='bg-black min-h-screen text-white p-10'>
      {isPending ? (
        <div className='flex justify-center py-20'>
          <LoadingSpinner />
        </div>
      ) : (
        <div className='grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
          {data?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
