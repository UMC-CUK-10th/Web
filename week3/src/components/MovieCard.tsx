import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onSelect?: (movie: Movie) => void;
}

export default function MovieCard({ movie, onSelect }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (onSelect) {
      onSelect(movie);
      return;
    }

    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer 
      w-44 transition-transform duration-300 hover:scale-105"
      role="button"
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          handleClick();
        }
      }}
    >
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={`${movie.title} 영화의 이미지`}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-64 w-full items-center justify-center bg-gray-200 px-3 text-center text-sm font-semibold text-gray-500">
          이미지 없음
        </div>
      )}

      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 
        to-transparent backdrop-blur-md flex flex-col justify-center items-center
        text-white p-4"
        >
          <h2 className="text-lg font-bold leading-snug">{movie.title}</h2>
          <p className="text-sm text-gray-300 leading-relaxed mt-2 line-clamp-5">
            {movie.overview}
          </p>
        </div>
      )}
    </div>
  );
}
