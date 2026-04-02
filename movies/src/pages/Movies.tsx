import { useState, useEffect } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';
import "../App.css"
import MoviesPageBar from '../components/moviesPageBar';
import MovieList from '../components/MovieList';
import Loading from './Loading';

export default function Movies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 상태
    const [page, setPage] = useState(1); // 현재 페이지 상태
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태

    console.log(movies);

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true); // 불러오기 시작 시 로딩 키기
            const { data } = await axios.get<MovieResponse>(
                `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`,
                {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjYzMzYyZTRlZjRjYTUyYzY3YzNjODllODI3ZDU4YyIsIm5iZiI6MTc3NTAxMzg2My4wMTksInN1YiI6IjY5Y2M4ZmU2NGQ5ZjY3OWMzZDQ4ZWRhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mHP8bw9awM1pMlj4AFPyROa86IxC94F8EqVFRYFug8Y'
                    }
                }
            );
            setMovies(data.results);
            setTotalPages(data.total_pages);
            setIsLoading(false); // 로딩 끄기
        };

        fetchMovies();
    }, [page]);
    return(
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">영화 데이터 불러오기</h1>
                <MoviesPageBar
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                    isLoading={isLoading}
                ></MoviesPageBar>
                { isLoading && (<Loading/>) }
                { !isLoading && (<MovieList movies={movies}/>) }
            </div>
        </div>
    )
}