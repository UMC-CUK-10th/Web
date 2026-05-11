import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteGetLpList } from '../hooks/queries/useInfiniteGetLpList';
import LpCard from '../components/LpCard';
import LpCardSkeletonList from '../components/LpCardSkeletonList';

const LpListPage = () => {
  // 1. 쿼리 파라미터 안정화 (무한 루프 방지)
  const queryParams = useMemo(() => ({
    order: 'desc' as const,
    limit: 20,
  }), []);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteGetLpList(queryParams);

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  // 2. 추가 데이터 로드 조건
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  // 3. 데이터 추출 로직 (백엔드 응답 구조에 맞게 수정)
  const lpList = data?.pages?.flatMap((page: any) => {
    const pageData = page?.data ?? page;
    return pageData?.data ?? pageData ?? [];
  }) ?? [];

  if (isError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500">
        데이터를 가져오는데 실패했습니다.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-10 px-4 pb-10">
      {/* 헤더 영역 */}
      <header className="mb-10 flex justify-between items-end border-b border-zinc-800 pb-4">
        <h1 className="text-[#FF2D78] text-3xl font-black italic tracking-tighter">
          돌려돌려LP판
        </h1>
        <div className="flex gap-1 text-xs">
          <button className="bg-zinc-800 text-zinc-400 px-3 py-1 rounded-l-sm">오래된순</button>
          <button className="bg-white text-black font-bold px-3 py-1 rounded-r-sm">최신순</button>
        </div>
      </header>

      {/* LP 그리드 영역 (3열 고정) */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          <LpCardSkeletonList count={12} />
        ) : lpList.length > 0 ? (
          <>
            {lpList.map((lp: any) => (
              <LpCard key={lp.id} lp={lp} />
            ))}

            {isFetching && hasNextPage && (
              <div className="contents">
                <LpCardSkeletonList count={3} />
              </div>
            )}
          </>
        ) : (
          <div className="col-span-full rounded-2xl border border-dashed border-zinc-700 bg-zinc-900 p-10 text-center text-white/70">
            LP 데이터를 찾을 수 없습니다.
          </div>
        )}
      </div>

      {/* 무한 스크롤 감지용 바닥 영역 */}
      <div ref={ref} className="h-20 w-full" />
    </div>
  );
};

export default LpListPage;