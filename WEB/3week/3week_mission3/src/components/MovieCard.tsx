import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w400";

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full aspect-[2/3] rounded-xl shadow-lg overflow-hidden cursor-pointer 
                 transition-all duration-300 transform hover:scale-110 hover:z-20 hover:shadow-2xl"
    >
      <img
        src={`${IMG_BASE_URL}${movie.poster_path}`}
        alt={`${movie.title} 포스터`}
        className="w-full h-full object-cover"
      />

      {isHovered && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col justify-center items-center text-white p-5 text-center animate-fadeIn">
          <h2 className="text-lg font-bold mb-3 break-keep">{movie.title}</h2>
          <p className="text-xs text-gray-200 line-clamp-6 leading-relaxed">
            {movie.overview || "등록된 줄거리 정보가 없습니다."}
          </p>
        </div>
      )}
    </div>
  );
}