import { memo } from "react"

import { useNavigate }
  from "react-router-dom"

import type { Movie }
  from "../types/movie"

interface Props {
  movie: Movie
  onClick: (movie: Movie) => void
}

function MovieCard({
  movie,
  onClick,
}: Props) {

  const navigate = useNavigate()

  console.log(
    movie.title,
    "렌더링"
  )

  return (

    <div
      onClick={() => {

        onClick(movie)

        navigate(
          `/movies/${movie.id}`
        )

      }}
      className="
        bg-zinc-900
        rounded-2xl
        overflow-hidden
        cursor-pointer
        hover:scale-105
        transition
        duration-300
        shadow-lg
        hover:shadow-red-500/20
      "
    >

      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image"
        }
        alt={movie.title}
        className="
          w-full
          h-[350px]
          object-cover
        "
      />

      <div className="p-4">

        <h2
          className="
            text-white
            text-lg
            font-bold
            line-clamp-1
          "
        >
          {movie.title}
        </h2>

      </div>

    </div>

  )
}

export default memo(MovieCard)