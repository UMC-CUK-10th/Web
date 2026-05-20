import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import type { MovieInfo } from "../types/MovieInfo";
import type { Person } from "../types/Person";

export const useMovieDetail = (movieId: string | undefined) => {
    const [movie, setMovie] = useState<MovieInfo | null>(null);
    const [people, setPeople] = useState<Person[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        if (!movieId) return;

        const fetched = async () => {
            setIsLoading(true);

            const token = import.meta.env.VITE_TMDB_TOKEN;
            const config = {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`
                },
                params: {
                    language: "ko-KR"
                }
            }
            try {
                const [movie, credit] = await Promise.all([
                    axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, config),
                    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, config)
                ])

                setMovie(movie.data);

                const crew = credit.data.crew
                    .filter((p: any) => p.job === "Director" || p.job === "Producer")
                    .map((p: any) => ({ 
                        id: p.id, 
                        name: p.name, 
                        role: p.job, 
                        profile_path: p.profile_path 
                    }));
                
                const cast = credit.data.cast.slice(0, 15)
                    .map((p: any) => ({ 
                        id: p.id, 
                        name: p.name, 
                        role: p.character, 
                        profile_path: p.profile_path 
                    }));

                // const unique = Array.from(new Map([...crew, ...cast].map(p => [p.id, p])).values());
                
                setPeople(Array.from(new Map([...crew, ...cast].map(p => [p.id, p])).values()));
            } catch (err) {
                setError(err as AxiosError);
            }
            setIsLoading(false);
        };

        fetched();
    }, [movieId]);

    return {
        movie,
        people,
        isLoading,
        error
    };
};