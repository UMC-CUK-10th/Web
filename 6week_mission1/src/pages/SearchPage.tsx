import { useState } from 'react';
import { useGetLpList } from '../hooks/queries/useGetLpList'; // 경로 확인!

const SearchPage = () => {
  // 1. 검색어 상태 관리
  const [searchTerm, setSearchTerm] = useState("");

  // 2. 작성하신 훅 호출 (검색어가 바뀔 때마다 React Query가 새로 데이터를 가져옵니다)
  const { data: lpList, isLoading } = useGetLpList({
    search: searchTerm,
    order: 'desc',
    limit: 50
  });

  return (
    <div className="min-h-screen bg-white">
      {/* --- 검색창 섹션 (두 번째 사진 부분) --- */}
      <div className="pt-20 pb-10 px-4 max-w-7xl mx-auto">
        <div className="relative">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="LP 제목을 검색하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // 입력할 때마다 searchTerm 업데이트
          />
        </div>
      </div>

      {/* --- 검색 결과 섹션 (첫 번째 사진 같은 그리드) --- */}
      <div className="bg-[#0a1a14] py-10 px-8"> {/* 결과 부분은 어두운 배경 */}
        {isLoading ? (
          <p className="text-white text-center">검색 중...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {lpList?.map((lp) => (
              <div key={lp.id} className="group">
                <div className="aspect-square overflow-hidden rounded-sm bg-gray-800 mb-3">
                  <img 
                    src={lp.thumbnail} 
                    alt={lp.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-green-400 text-[10px] font-bold">PREMIUM ARTIST</p>
                  <h3 className="text-white text-sm font-medium truncate">{lp.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* 검색 결과가 없을 때 */}
        {!isLoading && lpList?.length === 0 && (
          <p className="text-gray-400 text-center py-20">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;