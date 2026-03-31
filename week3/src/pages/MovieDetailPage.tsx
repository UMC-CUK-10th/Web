import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
    const param = useParams()

    console.log(param)
    return <div>MovieDetailPage{param.movieId}</div>
}

export default MovieDetailPage;