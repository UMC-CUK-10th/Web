import { memo } from "react"
import type { Movie } from "../types/movie"

interface Props {
  movie: Movie
  onClick: (movie: Movie) => void
}

function MovieCard({ movie, onClick }: Props) {
  console.log(`${movie.title} 렌더링`)

  return (
    <div
      onClick={() => onClick(movie)}
      className="cursor-pointer transition hover:scale-105"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded-xl h-[350px] w-full object-cover"
      />

      <h2 className="mt-2 text-lg font-bold">
        {movie.title}
      </h2>
    </div>
  )
}

export default memo(MovieCard)