import { useParams } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useCustomFetch } from "../hooks/useCustomFetch";
import type { MovieDetailInfo, MovieCreditsResponse } from "../types/movie";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const detailUrl = movieId
    ? `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
    : null;

  const creditsUrl = movieId
    ? `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`
    : null;

  const {
    data: detail,
    isPending: isDetailPending,
    isError: isDetailError,
  } = useCustomFetch<MovieDetailInfo>(detailUrl);

  const {
    data: credits,
    isPending: isCreditsPending,
    isError: isCreditsError,
  } = useCustomFetch<MovieCreditsResponse>(creditsUrl);

  const isPending = isDetailPending || isCreditsPending;
  const isError = isDetailError || isCreditsError;

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-10">
        <span className="text-2xl text-red-500">
          영화 정보를 불러오는 중 오류가 발생했습니다.
        </span>
      </div>
    );
  }

  if (isPending || !detail || !credits) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return <MovieDetail detail={detail} credits={credits} />;
};

export default MovieDetailPage;