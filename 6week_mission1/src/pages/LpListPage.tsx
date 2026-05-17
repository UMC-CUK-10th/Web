// 1번째 줄: 사용하지 않는 React 임포트 제거
import { useGetLpList } from '../hooks/queries/useGetLpList';

const LpListPage = () => {
  const { data: lpList, isLoading, isError } = useGetLpList({
    order: 'desc',
    limit: 50,
  });

  if (isLoading) return <div className="text-white p-10 text-center">LP 목록을 불러오는 중...</div>;
  if (isError) return <div className="text-red-500 p-10 text-center">데이터를 가져오는데 실패했습니다.</div>;

  return (
    <div className="min-h-screen bg-[#0a1a14] pt-24 px-8 pb-10">
      <header className="mb-8">
        <p className="text-green-400 text-sm font-semibold mb-1">DEEP GREEN COLLECTION</p>
        <h1 className="text-white text-3xl font-bold">전체 LP</h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {lpList?.map((lp) => (
          <div key={lp.id} className="group cursor-pointer">
            <div className="aspect-square overflow-hidden rounded-sm bg-gray-800 mb-3">
              <img 
                src={lp.thumbnail} 
                alt={lp.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            <div className="space-y-1">
              <p className="text-[#4ade80] text-[10px] font-bold tracking-tighter uppercase">
                PREMIUM ARTIST
              </p>
              <h3 className="text-white text-sm font-medium line-clamp-2 leading-snug">
                {lp.title}
              </h3>
              
              {/* 48번째 줄: 이제 lp.tags가 인식됩니다 */}
              <div className="flex flex-wrap gap-1 mt-1">
                {lp.tags?.map((tag) => (
                  <span key={tag.id} className="text-gray-500 text-xs">#{tag.name}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LpListPage;