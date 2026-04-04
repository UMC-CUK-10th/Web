import { useState, useEffect } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';
import "../App.css"

export default function Movies() {
    const [movies, setMovies] = useState<Movie[]>([]);

    console.log(movies);

    useEffect(() => {
        const fetchMovies = async () => {
            const { data } = await axios.get<MovieResponse>(
                'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
                {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjYzMzYyZTRlZjRjYTUyYzY3YzNjODllODI3ZDU4YyIsIm5iZiI6MTc3NTAxMzg2My4wMTksInN1YiI6IjY5Y2M4ZmU2NGQ5ZjY3OWMzZDQ4ZWRhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mHP8bw9awM1pMlj4AFPyROa86IxC94F8EqVFRYFug8Y'
                    }
                }
            );
            setMovies(data.results);
        };

        fetchMovies();
    }, []);
    return(
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">영화 데이터 불러오기</h1>
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
            </div>
        </div>
    )
}