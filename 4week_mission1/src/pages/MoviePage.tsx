// src/pages/MoviePage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { type MovieResponse, type Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import useCustomFetch from "../hooks/useCustomFetch";

export default function MoviePage() {
  const navigate = useNavigate();
  
  const { category, page: pageParam } = useParams<{ category: string; page?: string }>();
  
  const currentPage = Number(pageParam) || 1;

  const { data: movies, isPending, isError } = useCustomFetch<MovieResponse>(
    `/movie/${category}?language=ko-KR&page=${currentPage}`
  );

  const handlePageChange = (newPage: number) => {
    navigate(`/movies/${category}/${newPage}`);
  };

  if (isError) return <div className="p-10">에러가 발생했습니다.</div>;

  return (
    <>
      <div className='flex items-center justify-center gap-6 my-5'>
        <button 
          className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg disabled:bg-gray-300'
          disabled={currentPage === 1} 
          onClick={() => handlePageChange(currentPage - 1)}
        >{'<'}</button>
        
        <span className="font-bold">{currentPage} 페이지</span>
        
        <button 
          className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg' 
          onClick={() => handlePageChange(currentPage + 1)}
        >{'>'}</button>
      </div>

      {isPending ? (
        <div className='flex items-center justify-center h-dvh'><LoadingSpinner /></div>
      ) : (
        <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
          {movies?.results?.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}