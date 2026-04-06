import { useParams, useNavigate } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  runtime: number;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface CrewMember {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

type PeopleCard = {
  id: number;
  name: string;
  role: string;
  profile_path: string | null;
  type: "director" | "cast";
};

function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();

  // ✅ Custom Hook 사용
  const {
    data: movie,
    loading,
    error,
  } = useCustomFetch<MovieDetails>(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
  );

  const { data: credits } = useCustomFetch<Credits>(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        로딩 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg font-semibold">
        ⚠️ {error}
      </div>
    );
  }

  if (!movie || !credits) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        데이터가 없습니다.
      </div>
    );
  }

  const director = credits.crew.find((p) => p.job === "Director");
  const topCast = credits.cast.slice(0, 11);

  const people: PeopleCard[] = [
    ...(director
      ? [
          {
            id: director.id,
            name: director.name,
            role: "감독",
            profile_path: director.profile_path,
            type: "director" as const,
          },
        ]
      : []),
    ...topCast.map((person) => ({
      id: person.id,
      name: person.name,
      role: person.character || "배우",
      profile_path: person.profile_path,
      type: "cast" as const,
    })),
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1200px] mx-auto px-6 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur hover:bg-white/30 transition"
        >
          ← 뒤로가기
        </button>
      </div>

      {/* 배경 */}
      <div
        className="relative mt-6 bg-cover bg-center"
        style={{
          backgroundImage: movie.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            : "none",
        }}
      >
        <div className="bg-black/55">
          <div className="max-w-[1200px] mx-auto px-6 py-16">
            <div className="max-w-[820px]">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {movie.title}
              </h1>

              <div className="flex flex-wrap gap-3 mb-6 text-sm">
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  개봉일 {movie.release_date || "정보 없음"}
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  러닝타임 {movie.runtime ? `${movie.runtime}분` : "정보 없음"}
                </span>
              </div>

              <p className="text-gray-100 leading-8 text-base md:text-lg">
                {movie.overview || "줄거리 정보가 없습니다."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 감독 + 출연 */}
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-5">감독 / 출연</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {people.map((person) => (
            <div
              key={`${person.type}-${person.id}`}
              className="bg-white text-black rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition"
            >
              {person.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                  className="w-full h-[250px] object-cover"
                />
              ) : (
                <div className="w-full h-[250px] bg-gray-300 flex items-center justify-center text-sm">
                  이미지 없음
                </div>
              )}

              <div className="p-4">
                <p className="font-bold text-sm line-clamp-1">{person.name}</p>
                <p
                  className={`text-sm ${
                    person.type === "director"
                      ? "text-blue-600 font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  {person.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;