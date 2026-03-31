interface Movie {
  id: number;
  poster_path: string | null;
  overview: string;
  title: string;
}

interface Props {
  movie: Movie;
}

function MovieCard({ movie }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md">
      
      {/* 포스터 */}
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full object-cover transition duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-[300px] bg-gray-300 flex items-center justify-center">
          이미지 없음
        </div>
      )}

      {/* hover 정보 */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
        
        <h2 className="text-white font-bold text-lg mb-2 line-clamp-2">
          {movie.title}
        </h2>

        <p className="text-white text-sm line-clamp-4">
          {movie.overview || "줄거리 정보가 없습니다."}
        </p>

      </div>
    </div>
  );
}

export default MovieCard;