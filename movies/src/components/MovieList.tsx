import type { Movie } from "../types/movie"

interface MovieListProps {
    movies: Movie[];
}

export default function MovieList({ movies }: MovieListProps) {
    return (
        <ul className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6'>
            {movies.length > 0 ? (
                movies.map((movie) => (
                    <li
                        key={movie.id}
                        className='
                                    relative group rounded-xl overflow-hidden 
                                    flex flex-col
                                    shadow-lg
                                    aspect=[2/3]
                                    bg-gray-200
                                '
                    >
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
                    </li>
                ))
            ) : (
                <p>표시할 영화 없음</p>
            )}
        </ul>
    )
}