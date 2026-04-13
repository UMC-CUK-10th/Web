import { useState, useEffect } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';
import "../App.css"
import MoviesPageBar from '../components/moviesPageBar';
import MovieList from '../components/MovieList';
import Loading from './Loading';
import useMovies from '../hooks/useMovies';

export default function Movies() {
    const { movies, isLoading, error } = useMovies("popular");

    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 상태
    const [page, setPage] = useState(1); // 현재 페이지 상태
    if (isLoading) return <Loading/> // 로딩 상태
    if (error) return <p>에러가 발생했습니다. {error.message}</p>

    return(
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">인기 영화</h1>
                <MoviesPageBar
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                    isLoading={isLoading}
                ></MoviesPageBar>
                { !isLoading && (<MovieList movies={movies}/>) }
            </div>
        </div>
    )
}