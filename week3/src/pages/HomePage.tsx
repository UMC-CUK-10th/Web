import { type FormEvent, useMemo, useState } from "react";
import MovieCard from "../components/MovieCard";
import MovieInfoModal from "../components/MovieInfoModal";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useCustomFetch } from "../hooks/useCustomFetch";
import type { Movie, MovieResponse } from "../types/movie";

type LanguageCode = "ko-KR" | "en-US" | "ja-JP";

const BASE_URL = "https://api.themoviedb.org/3";

const Homepage = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [submittedTitle, setSubmittedTitle] = useState("");
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>("ko-KR");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
    }),
    []
  );

  const params = useMemo(
    () => ({
      query: submittedTitle,
      include_adult: includeAdult,
      language,
      page: 1,
    }),
    [includeAdult, language, submittedTitle]
  );

  const { data, isLoading, error } = useCustomFetch<MovieResponse>(
    `${BASE_URL}/search/movie`,
    {
      params,
      headers,
      enabled: submittedTitle.length > 0,
      errorMessage: "영화 검색 결과를 불러오지 못했습니다.",
    }
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedTitle(movieTitle.trim());
  };

  return (
    <section className="px-5 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <p className="text-sm font-semibold text-[#dda5e3]">Movie Search</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">영화 검색</h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-4 lg:grid-cols-[1fr_auto_auto_auto]"
          >
            <label className="flex flex-col gap-2 text-sm font-semibold text-gray-700">
              영화 제목
              <input
                type="text"
                value={movieTitle}
                onChange={(event) => setMovieTitle(event.target.value)}
                placeholder="영화 제목을 입력하세요"
                className="h-11 rounded-lg border border-gray-300 px-4 text-base text-gray-900 outline-none transition focus:border-[#dda5e3] focus:ring-2 focus:ring-[#dda5e3]/30"
              />
            </label>

            <label className="flex h-11 items-center gap-2 self-end rounded-lg border border-gray-300 px-4 text-sm font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={includeAdult}
                onChange={(event) => setIncludeAdult(event.target.checked)}
                className="h-4 w-4 accent-[#dda5e3]"
              />
              성인 콘텐츠 포함
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-gray-700">
              언어
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value as LanguageCode)}
                className="h-11 rounded-lg border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-900 outline-none transition focus:border-[#dda5e3] focus:ring-2 focus:ring-[#dda5e3]/30"
              >
                <option value="ko-KR">한국어 (ko-KR)</option>
                <option value="en-US">영어 (en-US)</option>
                <option value="ja-JP">일본어 (ja-JP)</option>
              </select>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="h-11 self-end rounded-lg bg-[#dda5e3] px-6 text-sm font-bold text-white shadow-md transition hover:bg-[#c98ad2] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isLoading ? "검색 중" : "검색"}
            </button>
          </form>
        </div>

        {!submittedTitle && (
          <p className="mt-6 text-center text-gray-500">
            영화 제목을 입력한 뒤 검색해 주세요.
          </p>
        )}

        {isLoading && (
          <div className="flex h-80 items-center justify-center">
            <LoadingSpinner />
          </div>
        )}

        {error && (
          <p className="mt-6 text-center text-xl font-semibold text-red-500">
            {error}
          </p>
        )}

        {!isLoading && submittedTitle && !error && data?.results.length === 0 && (
          <p className="mt-6 text-center text-gray-500">검색 결과가 없습니다.</p>
        )}

        {!isLoading && data && data.results.length > 0 && (
          <div
            className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 
            md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          >
            {data.results.map((movie: Movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelect={setSelectedMovie}
              />
            ))}
          </div>
        )}
      </div>

      {selectedMovie && (
        <MovieInfoModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </section>
  );
};

export default Homepage;
