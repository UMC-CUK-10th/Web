import type { Movie } from "../types/movie"
import MovieCard from "./MovieCard";

interface MovieListProps {
    movies: Movie[];
}

export default function MovieList({ movies }: MovieListProps) {
    return (
        <ul className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6'>
            {movies.length > 0 ? (
                movies.map((movie) => (
                    <li key={movie.id}
                        className='
                            relative group rounded-xl overflow-hidden 
                            flex flex-col
                            shadow-lg
                            aspect=[2/3]
                            bg-gray-200
                        '
                    >
                        <MovieCard movie={movie}/>
                    </li>
                ))
            ) : (
                <p>표시할 영화 없음</p>
            )}
        </ul>
    )
}