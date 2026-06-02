import type { Movie } from "../types/movie"

interface Props {
  movie: Movie
  onClose: () => void
}

function MovieModal({ movie, onClose }: Props) {

  return (

    <div
      onClick={onClose}
      className="
        fixed inset-0 z-50
        bg-black/70 backdrop-blur-sm
        flex items-center justify-center
        p-4
      "
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          bg-zinc-900
          w-full
          max-w-4xl
          rounded-3xl
          overflow-hidden
          shadow-2xl
          border border-zinc-700
          animate-in fade-in zoom-in
        "
      >

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4
            w-10 h-10
            rounded-full
            bg-black/60
            text-white
            hover:bg-red-500
            transition
            text-xl
            z-10
          "
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2">

          {/* 포스터 */}
          <div className="relative">

            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.title}
              className="
                w-full
                h-[350px] md:h-full
                object-cover
              "
            />

            {/* 그라데이션 */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t
                from-black/80
                to-transparent
              "
            />

          </div>

          {/* 정보 */}
          <div className="p-8 flex flex-col">

            <h2
              className="
                text-4xl
                font-black
                text-white
                mb-4
              "
            >
              {movie.title}
            </h2>

            <div className="flex gap-4 mb-6">

              <div
                className="
                  bg-yellow-500/20
                  text-yellow-400
                  px-4 py-2
                  rounded-full
                  text-sm
                  font-bold
                "
              >
                ⭐ {movie.vote_average.toFixed(1)}
              </div>

              <div
                className="
                  bg-zinc-800
                  text-zinc-300
                  px-4 py-2
                  rounded-full
                  text-sm
                "
              >
                📅 {movie.release_date}
              </div>

            </div>

            <p
              className="
                text-zinc-300
                leading-relaxed
                flex-1
                overflow-y-auto
              "
            >
              {movie.overview || "줄거리 정보가 없습니다."}
            </p>

            {/* 버튼 */}
            <div className="flex gap-3 mt-8">

              <button
                onClick={() =>
                  window.open(
                    `https://www.imdb.com/find?q=${movie.title}`,
                    "_blank"
                  )
                }
                className="
                  flex-1
                  bg-yellow-500
                  hover:bg-yellow-400
                  text-black
                  font-bold
                  py-3
                  rounded-xl
                  transition
                "
              >
                IMDb 검색
              </button>

              <button
                onClick={onClose}
                className="
                  flex-1
                  bg-zinc-800
                  hover:bg-red-500
                  text-white
                  py-3
                  rounded-xl
                  transition
                "
              >
                닫기
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}

export default MovieModal