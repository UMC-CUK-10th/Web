import { useState } from 'react';
import { useGetLpList, type LpItem } from '../hooks/queries/useGetLpList';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: lpList, isLoading } = useGetLpList({
    search: searchTerm,
    order: 'desc',
    limit: 50,
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20 pb-10 px-4 max-w-7xl mx-auto">
        <div className="relative">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="LP 제목을 검색하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-[#0a1a14] py-10 px-8">
        {isLoading ? (
          <p className="text-white text-center">검색 중...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {lpList?.map((lp: LpItem) => (
              <div key={lp.id} className="group">
                <div className="aspect-square overflow-hidden rounded-sm bg-gray-800 mb-3">
                  <img
                    src={lp.thumbnail
                      ? lp.thumbnail.startsWith('http') || lp.thumbnail.startsWith('data:')
                        ? lp.thumbnail
                        : `${import.meta.env.VITE_SERVER_API_URL}${lp.thumbnail}`
                      : 'https://via.placeholder.com/500?text=No+Image'}
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

        {!isLoading && lpList?.length === 0 && (
          <p className="text-gray-400 text-center py-20">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
