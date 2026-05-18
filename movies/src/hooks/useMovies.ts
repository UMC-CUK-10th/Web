import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import type { Movie } from "../types/movie";

const useMovies = (url: string) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>(null);

    const token = import.meta.env.VITE_TMDB_TOKEN;
    const config = {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        params: {
            language: "ko-KR",
        }
    }

    useEffect(() => {
        const fetched = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${url}`, config);
                setMovies(response.data.results);
            } catch (error) {
                setError(error as AxiosError);
            }
            setIsLoading(false);
        }
        fetched();
    }, [url])

    return { movies, isLoading, error }
};

export default useMovies;