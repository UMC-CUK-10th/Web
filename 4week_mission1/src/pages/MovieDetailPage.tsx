// src/pages/MovieDetailPage.tsx
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import useCustomFetch from '../hooks/useCustomFetch';
import type { MovieDetail, Credits } from '../types/movie';

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  // 영화 상세 정보 훅
  const { data: detail, isPending: isDetailPending, isError: isDetailError } = 
    useCustomFetch<MovieDetail>(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`);

  // 출연진 정보 훅
  const { data: credits, isPending: isCreditsPending, isError: isCreditsError } = 
    useCustomFetch<Credits>(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`);

  if (isDetailPending || isCreditsPending) return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
  if (isDetailError || isCreditsError) return <div className="text-red-500 p-10 text-center">영화 정보를 불러오는 중 에러가 발생했습니다.</div>;
  if (!detail) return null;

  return (
    <div className="p-10 max-w-6xl mx-auto">
      {/* 영화 정보 섹션 */}
      <div className="flex flex-col md:flex-row gap-10 mb-16">
        <img 
          src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`} 
          alt={detail.title} 
          className="w-full md:w-80 rounded-2xl shadow-2xl transition-transform hover:scale-102"
        />
        <div className="flex-1 text-black">
          <h1 className="text-5xl font-extrabold mb-3 leading-tight">{detail.title}</h1>
          <p className="text-xl text-purple-400 italic mb-6">"{detail.tagline}"</p>
          <div className="flex items-center gap-4 mb-8 text-lg">
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold">★ {detail.vote_average.toFixed(1)}</span>
            <span className="text-gray-500">{detail.release_date}</span>
            <span className="text-gray-500">{detail.runtime}분</span>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-3 text-gray-800">줄거리</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{detail.overview || "등록된 줄거리가 없습니다."}</p>
          </div>
        </div>
      </div>

      {/* 출연진 섹션 */}
      <div>
        <h2 className="text-3xl font-bold mb-8 border-l-4 border-[#D8B4FE] pl-4">주요 출연진</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-8">
          {credits?.cast.slice(0, 12).map((person) => (
            <div key={person.id} className="group text-center">
              <div className="aspect-square rounded-full overflow-hidden bg-gray-100 mb-4 border-2 border-transparent group-hover:border-[#D8B4FE] transition-all shadow-md">
                {person.profile_path ? (
                  <img src={`https://image.tmdb.org/t/p/w200${person.profile_path}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                )}
              </div>
              <p className="text-md font-bold text-gray-800 truncate">{person.name}</p>
              <p className="text-sm text-gray-500 truncate">{person.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;