import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  Routes,
  Route,
} from "react-router-dom"

import MovieList from "./components/MovieList"
import MovieModal from "./components/MovieModal"
import MovieDetailPage from "./pages/MovieDetailPage"

import { searchMovies } from "./api/tmdb"

import type { Movie } from "./types/movie"

function HomePage() {

  const [query, setQuery] = useState("")
  const [includeAdult, setIncludeAdult]
    = useState(false)

  const [language, setLanguage]
    = useState("ko-KR")

  const [movies, setMovies]
    = useState<Movie[]>([])

  const [selectedMovie, setSelectedMovie]
    = useState<Movie | null>(null)

  // 기본 영화 로딩
  useEffect(() => {

    const loadMovies = async () => {

      const data = await searchMovies({
        query: "avengers",
        includeAdult: false,
        language: "ko-KR",
      })

      setMovies(data)
    }

    loadMovies()

  }, [])

  // 검색
  const handleSearch = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault()

    const data = await searchMovies({
      query,
      includeAdult,
      language,
    })

    setMovies(data)
  }

  // useCallback 최적화
  const handleMovieClick = useCallback(
    (movie: Movie) => {
      setSelectedMovie(movie)
    },
    []
  )

  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null)
  }, [])

  // useMemo 최적화
  const filteredMovies = useMemo(() => {
    return movies
  }, [movies])

  return (

    <div
      className="
        max-w-7xl
        mx-auto
        p-5
        min-h-screen
        bg-black
        text-white
      "
    >

      <h1
        className="
          text-4xl
          font-bold
          mb-8
        "
      >
        영화 검색
      </h1>

      <form
        onSubmit={handleSearch}
        className="
          flex
          flex-col
          md:flex-row
          gap-4
          mb-10
        "
      >

        <input
          type="text"
          placeholder="영화 제목을 입력하세요"
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          className="
            flex-1
            px-4
            py-3
            rounded-lg
            bg-zinc-900
            text-white
            border
            border-zinc-700
            outline-none
          "
        />

        <label
          className="
            flex
            items-center
            gap-2
          "
        >

          <input
            type="checkbox"
            checked={includeAdult}
            onChange={(e) =>
              setIncludeAdult(
                e.target.checked
              )
            }
          />

          성인 콘텐츠 포함

        </label>

        <select
          value={language}
          onChange={(e) =>
            setLanguage(e.target.value)
          }
          className="
            bg-zinc-900
            px-4
            py-3
            rounded-lg
            border
            border-zinc-700
          "
        >

          <option value="ko-KR">
            한국어
          </option>

          <option value="en-US">
            영어
          </option>

          <option value="ja-JP">
            일본어
          </option>

        </select>

        <button
          type="submit"
          className="
            bg-red-500
            hover:bg-red-600
            px-6
            py-3
            rounded-lg
            font-bold
            transition
          "
        >
          검색
        </button>

      </form>

      <MovieList
        movies={filteredMovies}
        onMovieClick={handleMovieClick}
      />

      {selectedMovie && (

        <MovieModal
          movie={selectedMovie}
          onClose={handleCloseModal}
        />

      )}

    </div>

  )
}

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/movies/:movieId"
        element={<MovieDetailPage />}
      />

    </Routes>

  )
}

export default App