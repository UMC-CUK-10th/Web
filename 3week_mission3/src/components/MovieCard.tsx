import { useNavigate } from 'react-router-dom';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div 
      onClick={() => navigate(`/movies/${movie.id}`)}
      className="cursor-pointer transition-transform hover:scale-105"
    >
      <img 
        src={posterUrl} 
        alt={movie.title} 
        className="w-full h-auto rounded-xl shadow-sm"
      />
    </div>
  );
};

export default MovieCard;