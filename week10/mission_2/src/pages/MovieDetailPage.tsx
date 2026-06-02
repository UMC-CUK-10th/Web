import { useParams } from "react-router-dom"

function MovieDetailPage() {

  const { movieId } = useParams()

  return (

    <div className="p-10 text-white bg-black min-h-screen">

      <h1 className="text-4xl font-bold">
        영화 상세 페이지
      </h1>

      <p className="mt-5">
        movieId: {movieId}
      </p>

    </div>

  )
}

export default MovieDetailPage