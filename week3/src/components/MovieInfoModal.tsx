import type { Movie } from "../types/movie";

interface MovieInfoModalProps {
  movie: Movie;
  onClose: () => void;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";

export default function MovieInfoModal({ movie, onClose }: MovieInfoModalProps) {
  const imdbSearchUrl = `https://www.imdb.com/find?q=${encodeURIComponent(
    movie.title
  )}`;
  const releaseDate = movie.release_date || "개봉일 정보 없음";
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null;
  const backdropUrl = movie.backdrop_path
    ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
    : null;
  const popularityPercent = Math.min(Math.round(movie.popularity), 100);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-8"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-72 overflow-hidden bg-gray-950 sm:h-80">
          {backdropUrl ? (
            <img
              src={backdropUrl}
              alt={`${movie.title} 배경 이미지`}
              className="h-full w-full object-cover"
            />
          ) : posterUrl ? (
            <img
              src={posterUrl}
              alt={`${movie.title} 포스터`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-lg font-bold text-gray-400">
              이미지 없음
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

          <button
            type="button"
            onClick={onClose}
            aria-label="모달 닫기"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-3xl leading-none text-white transition hover:bg-black/75"
          >
            ×
          </button>

          <div className="absolute bottom-8 left-6 right-16 text-white sm:left-10">
            <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">
              {movie.title}
            </h2>
            <p className="mt-2 text-sm font-semibold text-white/80">
              {movie.original_title}
            </p>
          </div>
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-[18rem_1fr] sm:p-8">
          <div className="mx-auto w-full max-w-72 sm:mx-0">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={`${movie.title} 포스터`}
                className="aspect-[2/3] w-full rounded-md object-cover shadow-lg"
              />
            ) : (
              <div className="flex aspect-[2/3] w-full items-center justify-center rounded-md bg-gray-200 text-sm font-semibold text-gray-500 shadow-lg">
                포스터 없음
              </div>
            )}
          </div>

          <div className="text-center text-gray-700">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl font-extrabold text-blue-500">
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-sm font-semibold text-gray-500">
                ({movie.vote_count} 평가)
              </span>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-extrabold text-gray-800">개봉일</h3>
              <p className="mt-3 text-base font-semibold text-gray-700">
                {releaseDate}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-extrabold text-gray-800">인기도</h3>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: `${popularityPercent}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-semibold text-gray-400">
                {movie.popularity.toFixed(1)}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-extrabold text-gray-800">줄거리</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-gray-600">
                {movie.overview || "줄거리 정보가 없습니다."}
              </p>
            </div>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={imdbSearchUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 items-center justify-center rounded-md bg-blue-500 px-5 text-sm font-bold text-white shadow-md transition hover:bg-blue-600"
              >
                IMDb에서 검색
              </a>
              <button
                type="button"
                onClick={onClose}
                className="h-11 rounded-md border border-blue-200 px-5 text-sm font-bold text-blue-500 transition hover:bg-blue-50"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
