import { useEffect, useState } from "react"
import axios from 'axios';
import type { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";

export default function MoviePage() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const {data} = await axios.get<MovieResponse>(
                'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    }
                }
        );
        //URL 쿼리 다루는 거에도 익숙해지면 좋음.
        console.log(data);

        setMovies(data.results); 
        // MovieResponse 타입을 맞추어 정의해놨기 때문에 data.을 입력하면 자동으로 어떤 속성이 있는지 보여준다.
    };
        fetchMovies();
    }, []);

    console.log(movies[0]?.adult);

  return (
    <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
    lg:grid-cols-5 xl:grid-cols-6'>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}