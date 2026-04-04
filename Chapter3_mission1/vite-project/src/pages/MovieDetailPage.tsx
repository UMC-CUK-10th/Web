import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieDetail from "../components/MovieDetail";
import { LoadingSpinner } from "../components/LoadingSpinner";
import type { MovieDetailInfo, MovieCreditsResponse } from "../types/movie";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [detail, setDetail] = useState<MovieDetailInfo | null>(null);
  const [credits, setCredits] = useState<MovieCreditsResponse | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchDetail = async () => {
      setIsPending(true);
      setIsError(false);

      try {
        const detailResponse = await axios.get<MovieDetailInfo>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        const creditsResponse = await axios.get<MovieCreditsResponse>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        setDetail(detailResponse.data);
        setCredits(creditsResponse.data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchDetail();
  }, [movieId]);

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-10">
        <span className="text-red-500 text-2xl">영화 정보를 불러오는 중 오류가 발생했습니다.</span>
      </div>
    );
  }

  if (isPending || !detail || !credits) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return <MovieDetail detail={detail} credits={credits} />;
};

export default MovieDetailPage;

