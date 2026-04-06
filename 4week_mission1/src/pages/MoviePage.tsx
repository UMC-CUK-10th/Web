// src/pages/MoviePage.tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import useCustomFetch from '../hooks/useCustomFetch'; // 훅 임포트
import type { MovieResponse } from '../types/movie';

const MoviePage = () => {
  const { category } = useParams<{ category: string }>();
  const [page, setPage] = useState(1);

  // 커스텀 훅 사용
  const url = `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`;
  const { data, isPending, isError } = useCustomFetch<MovieResponse>(url);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category, page]);

  if (isError) return <div className="text-red-500 p-10 text-center font-bold">에러가 발생했습니다. 다시 시도해주세요!</div>;

  return (
    <div className="p-6">
      {/* 페이지네이션 UI */}
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
          {data?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviePage;