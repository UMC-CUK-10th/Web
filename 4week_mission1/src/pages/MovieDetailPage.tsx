import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";
import NotFoundPage from "./NotFoundPage";

const MovieDetailPage = () => {
  const {movieId} = useParams<{movieId: string}>();
  const [movie,setMovie] = useState<any>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError,setIsError] = useState(false);
  
  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsPending(true);
      setIsError(false);

      try {
        const {data} = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&append_to_response=credits`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovie(data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    if (movieId) {
      fetchMovieDetail();
    }
  }, [movieId]);

  if (isPending) return <div className="min-h-screen flex justify-center items-center">
    <LoadingSpinner/>
  </div>;
  if (isError) {
    return <NotFoundPage/>
  };
  if (!movie) return <NotFoundPage/>;

  return (
    <div className = "min-h-screen bg-gray-900 bg-gradient-to-t from-black via-gray-900 to-transparent p-8 text-white">
      <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        
        {/*포스터*/}
        <div className="w-full md:w-1/3 shrink-0">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
            className="w-full rounded-xl shadow-2xl"
          />
        </div>
  
        {/*정보*/}
        <div className="flex flex-col gap-6 md:w-2/3">
          
          {/*제목*/}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{movie.title}</h1>
  
          {/*평점,상영시간*/}
          <div className="flex items-center gap-6 text-lg font-semibold">
            <span className="flex items-center gap-1">⭐ {movie.vote_average.toFixed(1)}</span>
            <span className="border-l border-gray-300 pl-6 text-gray-200">상영 시간: <span className="text-white">{movie.runtime}분</span></span>
          </div>
  
          {/*장르*/}
          <div className="flex flex-wrap gap-2">
            {movie.genres?.map((genre: { id: number; name: string }) => (
              <span key={genre.id} className="bg-gray-100 border border-gray-200 px-3 py-1 rounded-full text-sm font-medium text-gray-600">
                {genre.name}
              </span>
            ))}
          </div>
  
          <hr className="border-gray-200" />
  
          {/*감독,출연진*/}
          <div className="flex flex-col gap-4">
            {/*감독*/}
            <div className="flex gap-3 items-center">
              <span className="font-bold text-gray-100 w-16">감독</span>
              <span className="text-gray-200">
                {movie.credits?.crew?.find((person: any) => person.job === 'Director')?.name || "정보 없음"}
              </span>
            </div>
  
            {/*출연진*/}
            <div className="flex gap-3 items-start">
              <span className="font-bold text-gray-100 w-16 shrink-0">출연</span>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-gray-200">
                {movie.credits?.cast?.slice(0, 5).map((person: any, index: number) => (
                  <span key={person.id}>{/*5명만*/}
                    {person.name}{index < 4 && movie.credits.cast.length > index + 1 ? "," : ""}
                  </span>
                ))}
              </div>
            </div>
          </div>
  
          <hr className="border-gray-200" />
  
          {/*줄거리*/}
          <div className="movie-overview">
            <h3 className="text-xl font-bold mb-3 text-gray-100">줄거리</h3>
            <p className="text-lg leading-relaxed text-gray-200">
              {movie.overview || "등록된 줄거리가 없습니다."}
            </p>
          </div>
        </div>
  
      </div>
    </div>
    </div>
  );

};

export default MovieDetailPage;