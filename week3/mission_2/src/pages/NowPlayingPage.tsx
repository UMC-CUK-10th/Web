import MovieListPage from "../components/MovieListPage";

function NowPlayingPage() {
  return <MovieListPage title="상영 중 영화" endpoint="now_playing" />;
}

export default NowPlayingPage;