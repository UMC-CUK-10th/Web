import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Movie, MovieCreditResponse } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<MovieCreditResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch movie details
        const movieResponse = await fetch(
          `${BASE_URL}/movie/${id}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        
        if (!movieResponse.ok) {
          console.error('Movie API Error:', await movieResponse.text());
          throw new Error("영화 정보를 불러오는데 실패했습니다.");
        }
        
        const movieData = await movieResponse.json();

        // Fetch credits
        const creditsResponse = await fetch(
          `${BASE_URL}/movie/${id}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        
        if (!creditsResponse.ok) {
          console.error('Credits API Error:', await creditsResponse.text());
          throw new Error("출연진 정보를 불러오는데 실패했습니다.");
        }
        
        const creditsData = await creditsResponse.json();

        setMovie(movieData);
        setCredits(creditsData);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!movie || !credits) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 text-xl">영화 정보를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Movie Poster */}
        <div className="md:w-1/3">
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Movie Details */}
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <div className="mb-4">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
              평점: {movie.vote_average.toFixed(1)}
            </span>
            <span className="ml-4 text-gray-600">
              개봉일: {new Date(movie.release_date).toLocaleDateString()}
            </span>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">줄거리</h2>
            <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
          </div>

          {/* Cast */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">주요 출연진</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {credits.cast.slice(0, 4).map((actor) => (
                <div key={actor.id} className="text-center">
                  <img
                    src={actor.profile_path ? `${IMAGE_BASE_URL}${actor.profile_path}` : '/placeholder.png'}
                    alt={actor.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover mb-2"
                  />
                  <p className="font-semibold">{actor.name}</p>
                  <p className="text-sm text-gray-600">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;