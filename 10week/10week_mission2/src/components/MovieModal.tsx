import type { Movie } from "../types/movies";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImage = "https://placehold.co/400x600";
  
  const posterUrl = movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : fallbackImage;
  const backdropUrl = movie.backdrop_path ? `${imageBaseUrl}${movie.backdrop_path}` : posterUrl;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl transition-all max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 font-bold text-white hover:bg-black/80 transition-all text-sm"
        >
          ✕
        </button>

        <div className="relative h-64 w-full bg-gray-900 shrink-0">
          <img 
            src={backdropUrl} 
            alt="" 
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="text-2xl font-extrabold">{movie.title}</h2>
            {movie.original_title !== movie.title && (
              <p className="mt-1 text-xs text-gray-300 font-medium">{movie.original_title}</p>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col sm:flex-row gap-6 p-6 overflow-y-auto">
          <div className="w-full sm:w-44 shrink-0 overflow-hidden rounded-lg shadow-md self-center sm:self-start">
            <img src={posterUrl} alt={movie.title} className="w-full h-auto object-cover" />
          </div>

          <div className="flex flex-1 flex-col text-center sm:text-left justify-between">
            <div className="space-y-4">
              <div>
                <p className="text-lg font-bold text-blue-600">
                  {movie.vote_average?.toFixed(1)}{" "}
                  <span className="text-xs font-normal text-gray-500">({movie.vote_count} 평가)</span>
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">개봉일</h4>
                <p className="text-sm font-semibold text-gray-800">
                  {movie.release_date ? movie.release_date.replace(/-/g, '년 ').concat('일') : "정보 없음"}
                </p>
              </div>

              <div className="relative pt-1">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">인기도</h4>
                <div className="flex h-1 overflow-hidden rounded bg-gray-100 text-xs">
                  <div style={{ width: `${Math.min(movie.popularity / 10, 100)}%` }} className="bg-blue-500" />
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">줄거리</h4>
                <p className="text-sm leading-relaxed text-gray-600 max-h-40 overflow-y-auto font-normal text-justify">
                  {movie.overview || "등록된 줄거리가 없습니다."}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center sm:justify-start gap-2 pt-2 border-t border-gray-100">
              <a 
                href={`https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-blue-700 transition-all"
              >
                IMDb에서 검색
              </a>
              <button 
                onClick={onClose}
                className="rounded-lg bg-gray-200 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-300 transition-all"
              >
                닫기
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};