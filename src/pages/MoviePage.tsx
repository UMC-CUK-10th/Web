import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsPending(true);
        setIsError(false);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );
        setMovies(response.data.results);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovies();
  }, [page]); // 페이지가 변경될 때마다 데이터를 다시 불러옵니다.

  if (isPending) return <LoadingSpinner />;
  if (isError) return <div className="text-red-500 text-center p-10 font-bold">에러가 발생했습니다.</div>;

  return (
    <div className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-green-400">인기 영화</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {movies.map((movie: any) => (
          <div 
            key={movie.id} 
            className="cursor-pointer group"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <img 
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
              alt={movie.title}
              className="rounded-xl transition group-hover:scale-105 group-hover:ring-4 group-hover:ring-green-400"
            />
            <p className="mt-3 text-center font-medium">{movie.title}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-8 mt-12">
        <button 
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-6 py-2 bg-green-500 text-black font-bold rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
        >
          이전
        </button>
        <span className="text-xl font-bold">{page}</span>
        <button 
          onClick={() => setPage(p => p + 1)}
          className="px-6 py-2 bg-green-500 text-black font-bold rounded-lg"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default MoviePage;