import { useState } from 'react';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-auto"
      />
      {isHovered && (
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/50 backdrop-blur flex flex-col justify-center items-center p-4">
          <h2 className="text-white text-lg font-bold text-center leading-snug">{movie.title}</h2>
          <p className="text-gray-300 text-sm mt-2 text-center leading-relaxed line-clamp-5">
            {movie.overview}
          </p>
        </div>
      )}
    </div>
  );
}