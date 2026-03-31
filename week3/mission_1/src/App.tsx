import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";

interface Movie {
  id: number;
  poster_path: string | null;
  overview: string;
  title: string;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = import.meta.env.VITE_TMDB_KEY;

        const response = await fetch(
          "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "application/json",
            },
          }
        );

        const data = await response.json();
        setMovies(data.results);
      } catch (err) {
        setError("에러 발생");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
          
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}

        </div>
      </div>
    </div>
  );
}

export default App;