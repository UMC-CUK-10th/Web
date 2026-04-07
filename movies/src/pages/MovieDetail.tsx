import { useParams } from "react-router-dom"
import Loading from "./Loading";
import { useMovieDetail } from "../hooks/useMovieDetail";

// import { useEffect, useState } from "react"
// import axios from "axios";
// import type { MovieInfo } from "../types/MovieInfo";
// import type { Person } from "../types/Person";


export default function MovieDetail() {
    const { movieId } = useParams<{ movieId: string }>();
    const { movie, people, isLoading, error } = useMovieDetail(movieId);

    // const [movie, setMovie] = useState<MovieInfo | null>(null);
    // const [loading, setLoading] = useState(true);
    // const [people, setPeople] = useState<Person[]>([]);

    // useEffect(() => {
    //     const fetched = async () => {
    //         setLoading(true);
    //         const config = {
    //             headers: {
    //                 Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjYzMzYyZTRlZjRjYTUyYzY3YzNjODllODI3ZDU4YyIsIm5iZiI6MTc3NTAxMzg2My4wMTksInN1YiI6IjY5Y2M4ZmU2NGQ5ZjY3OWMzZDQ4ZWRhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mHP8bw9awM1pMlj4AFPyROa86IxC94F8EqVFRYFug8Y'
    //             },
    //             params: {
    //                 language: "ko-KR"
    //             }
    //         };

    //         try {
    //             const [movieRes, creditRes] = await Promise.all([
    //                 axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, config),
    //                 axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, config)
    //             ]);

    //             setMovie(movieRes.data);

    //             const allPeople = [
    //                 ...creditRes.data.crew
    //                     .filter((p: any) => p.job === "Director" || p.job === "Producer")
    //                     .map((p: any) => ({
    //                         id: p.id,
    //                         name: p.name,
    //                         role: p.job,
    //                         profile_path: p.profile_path
    //                     })),
    //                 ...creditRes.data.cast.slice(0, 15).map((p: any) => ({
    //                     id: p.id,
    //                     name: p.name,
    //                     role: p.character,
    //                     profile_path: p.profile_path
    //                 }))
    //             ];

    //             const unique = Array.from(
    //                 new Map(allPeople.map((person) => [person.id, person])).values()
    //             )

    //             setPeople(unique);
    //         } catch {
    //             console.error("데이터 불러오기 에러")
    //         }
    //         setLoading(false)
    //     }

    //     if (movieId) {
    //         fetched();
    //     }
    // }, [movieId]);

    if (isLoading) {
        return <Loading />
    }

    if (error || !movie) {
        return <div>영화 정보를 찾을 수 없습니다.</div>
    }

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="relative w-full h-[500px] md:h-[700px] flex items-center justify-center overflow-hidden">

                {/* 배경 이미지 레이어 */}
                <div className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.overview})`
                    }}
                >
                    
                    <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black via-transparent to-black/30"></div>
                </div>

                {/* 2. [여기만 중앙정렬] 컨텐츠 영역 */}
                <div className="relative z-10 max-w-4xl mx-auto px-8 w-full flex flex-col items-center text-center gap-6">

                    {/* 타이틀 */}
                    <h1 className="text-5xl md:text-7xl font-black drop-shadow-2xl tracking-tighter">
                        {movie.title}
                    </h1>

                    {/* 장르 리스트 */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {movie.genres?.map(genre => (
                            <span key={genre.id} className="px-4 py-1 bg-yellow-500/90 text-black font-bold rounded-full text-xs md:text-sm">
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    {/* 상세 정보 (평점, 시간, 개봉일) */}
                    <div className="flex items-center justify-center gap-5 text-base md:text-xl font-medium text-gray-200">
                        <span className="flex items-center gap-1 text-yellow-400 font-bold">
                            ★ {movie.vote_average.toFixed(1)}
                        </span>
                        <span className="text-gray-500">|</span>
                        <span>{movie.runtime}분</span>
                        <span className="text-gray-500">|</span>
                        <span>{movie.release_date.split('-')[0]}년</span>
                    </div>

                    {/* 줄거리 (중앙 정렬을 위해 mx-auto 유지) */}
                    <p className="mt-4 text-gray-200 leading-relaxed max-w-2xl text-sm md:text-lg drop-shadow-md">
                        {movie.overview}
                    </p>
                </div>
            </div>

            {/* 3. 하단 감독 및 배우 섹션 */}
            <div className="max-w-6xl mx-auto px-8 pb-20">
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-8 border-l-4 border-yellow-500 pl-4">감독 및 배우</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {people.map((person) => (
                            <div key={person.id} className="group bg-gray-900 rounded-2xl overflow-hidden hover:ring-2 hover:ring-yellow-500 transition-all shadow-lg">
                                <div className="aspect-[3/4] overflow-hidden bg-gray-800">
                                    <img
                                        src={person.profile_path ? `https://image.tmdb.org/t/p/w342${person.profile_path}` : 'https://via.placeholder.com/342x456?text=No+Photo'}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        alt={person.name}
                                    />
                                </div>
                                <div className="p-4 bg-gray-900">
                                    <p className="font-bold text-sm truncate text-gray-100">{person.name}</p>
                                    <p className="text-xs text-yellow-500 mt-1 font-medium truncate">{person.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}