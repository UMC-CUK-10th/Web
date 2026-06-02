import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImage =
    "https://via.placeholder.com/500x750?text=No+Image+Available";

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
        <img
          src={
            movie.poster_path
              ? `${imageBaseUrl}${movie.poster_path}`
              : fallbackImage
          }
          alt={movie.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
          ⭐ {movie.vote_average.toFixed(1)}
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-2 line-clamp-1 text-base font-bold text-gray-900">
          {movie.title}
        </h3>

        <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
          <span>{movie.release_date || "개봉일 없음"}</span>
          <span className="h-1 w-1 rounded-full bg-gray-300" />
          <span className="uppercase">{movie.original_language}</span>
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-gray-600">
          {movie.overview || "줄거리 정보가 없습니다."}
        </p>
      </div>
    </article>
  );
};

export default MovieCard;