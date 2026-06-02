import type { Movie } from "../types/movie";

interface MovieDetailModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetailModal = ({ movie, onClose }: MovieDetailModalProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const backdropBaseUrl = "https://image.tmdb.org/t/p/w1280";
  const fallbackImage =
    "https://placehold.co/500x750/f3f4f6/9ca3af?text=No+Image";

  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : fallbackImage;

  const backdropUrl = movie.backdrop_path
    ? `${backdropBaseUrl}${movie.backdrop_path}`
    : posterUrl;

  const tmdbLink = `https://www.themoviedb.org/movie/${movie.id}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-xl font-bold text-white backdrop-blur transition hover:bg-black/70"
          aria-label="모달 닫기"
        >
          ×
        </button>

        <div className="relative h-72 overflow-hidden rounded-t-3xl bg-gray-100">
          <img
            src={backdropUrl}
            alt={`${movie.title} 배경 이미지`}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

          <div className="absolute bottom-7 left-6 right-20">
            <p className="mb-2 inline-flex rounded-full bg-violet-500 px-3 py-1 text-xs font-semibold text-white">
              MOVIE DETAIL
            </p>

            <h2
            className="line-clamp-2 text-3xl md:text-4xl"
            style={{
                color: "#ffffff",
                fontWeight: 700,
                textShadow: "0 2px 8px rgba(0,0,0,0.9)",
            }}
            >
            {movie.title}
            </h2>

            <p
            className="mt-2 text-sm"
            style={{
                color: "#ffffff",
                fontWeight: 500,
                textShadow: "0 1px 6px rgba(0,0,0,0.9)",
            }}
            >
            {movie.original_title}
            </p>
          </div>
        </div>

        <div className="grid gap-8 p-6 md:grid-cols-[220px_1fr]">
          <div>
            <img
              src={posterUrl}
              alt={`${movie.title} 포스터`}
              className="mx-auto aspect-[2/3] w-full max-w-[220px] rounded-2xl object-cover shadow-lg"
            />

            <div className="mt-4 rounded-2xl border border-violet-100 bg-violet-50 p-4 text-center">
              <p className="text-sm font-semibold text-gray-500">평점</p>

              <p className="mt-1 text-3xl font-bold text-violet-600">
                ⭐ {movie.vote_average.toFixed(1)}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {movie.vote_count?.toLocaleString()}명 참여
              </p>
            </div>
          </div>

          <div>
            <div className="mb-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-center">
                <p className="text-xs font-semibold text-gray-400">개봉일</p>
                <p className="mt-1 text-sm font-bold text-gray-800">
                  {movie.release_date || "정보 없음"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-center">
                <p className="text-xs font-semibold text-gray-400">언어</p>
                <p className="mt-1 text-sm font-bold uppercase text-violet-600">
                  {movie.original_language}
                </p>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-center text-xl font-bold text-gray-900">
                줄거리
              </h3>

              <p className="min-h-32 whitespace-pre-wrap rounded-2xl bg-gray-50 p-5 text-center text-sm leading-8 text-gray-600">
                {movie.overview || "등록된 줄거리 정보가 없습니다."}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              <a
                href={tmdbLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center justify-center rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                IMDB에서 보기
              </a>

              <button
                type="button"
                onClick={onClose}
                className="flex h-11 items-center justify-center rounded-xl border border-gray-300 bg-white px-5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
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

export default MovieDetailModal;