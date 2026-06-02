import MovieCard from "./MovieCard"
import type { Movie } from "../types/movie"

interface Props {
  movies: Movie[]
  onMovieClick: (movie: Movie) => void
}

function MovieList({ movies, onMovieClick }: Props) {
  console.log("MovieList 렌더링")

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={onMovieClick}
        />
      ))}
    </div>
  )
}

export default MovieList