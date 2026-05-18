import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({movie}: MovieCardProps) {
    return (
        <Link to={`/movies/${movie.id}`} className="block w-full h-full">
            <img
                className='
                    w-full h-full 
                    object-cover transition-transform
                    duration-300 ease-in-out 
                    group-hover:blur-sm'
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
            <div className='absolute bottom-0 inset-x-0 p-4 text-white opacity-0 group-hover:opacity-100'>
                <h2 className='text-lg font-extrabold line-clamp-2 leading-tight mb-1 drop-shadow-md'>
                    {movie.title}
                </h2>
                <p className='text-xs text-gray-300 text-center line-clamp-3 mb-4'>{movie.overview}</p>
            </div>
        </Link>
    )
}