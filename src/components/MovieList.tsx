import type { Movie } from '../types/movie';

interface MovieListProps {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
}

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w300';

const MovieList = ({ movies, isLoading, error }: MovieListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center text-gray-500">
          <div className="mb-3 text-4xl animate-spin">⏳</div>
          <p className="text-lg font-medium">로딩 중입니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="rounded-xl bg-red-50 px-8 py-6 text-center text-red-600">
          <p className="text-lg font-semibold">오류 발생</p>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center text-gray-400">
          <div className="mb-3 text-4xl">🎬</div>
          <p className="text-lg font-medium">검색 결과가 없습니다.</p>
          <p className="mt-1 text-sm">검색어를 입력하고 검색 버튼을 눌러보세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="group overflow-hidden rounded-xl bg-white shadow hover:shadow-lg transition-shadow"
        >
          {movie.poster_path ? (
            <img
              src={`${TMDB_IMAGE_BASE}${movie.poster_path}`}
              alt={movie.title}
              className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex h-48 w-full items-center justify-center bg-gray-200 text-gray-400">
              <span className="text-4xl">🎬</span>
            </div>
          )}
          <div className="p-3">
            <h3 className="truncate text-sm font-semibold text-gray-800" title={movie.title}>
              {movie.title}
            </h3>
            <p className="mt-1 text-xs text-gray-500">{movie.release_date?.slice(0, 4) ?? '–'}</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-yellow-500">
              <span>⭐</span>
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
