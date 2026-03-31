import { useState } from 'react';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      {isHovered && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col justify-center items-center p-4 text-white">
          <h2 className="text-lg font-bold text-center leading-snug mb-2">
            {movie.title}
          </h2>
          <p className="text-sm text-gray-300 text-center line-clamp-5 leading-relaxed">
            {movie.overview}
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieCard;