import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../types/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import LpUploadModal from "./LpUploadModal";
import { useThrottle } from "../hooks/useThrottle";

const HomePage = () => {
  const [search] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(
    12,
    search,
    PAGINATION_ORDER.desc
  );

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // 3초 제한을 두고 fetchNextPage를 실행할 쓰로틀 함수
  const throttledFetch = useThrottle(() => {
    console.log("Throttle");
    fetchNextPage();
  }, 3000);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | null = null;

    const checkAndFetch = () => {
      // 바닥에 닿아있고, 다음 페이지가 있고, 현재 진짜 로딩 중이 아닐 때만 쓰로틀 실행
      if (inView && hasNextPage && !isFetching) {
        throttledFetch();
      }

      // [핵심] 사용자가 바닥에 스크롤을 대고 가만히 있는 경우를 대비해,
      // 300ms마다 조건을 지속적으로 재확인하여 쓰로틀 제한(3초)이 풀리는 순간 바로 다음 데이터를 요청하게 만듭니다.
      if (inView && hasNextPage) {
        timerId = setTimeout(checkAndFetch, 300);
      }
    };

    checkAndFetch();

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  // 상태가 바뀔 때뿐만 아니라 주기적인 루프를 통해 3초 락이 풀리는 타이밍을 정확히 캐치합니다.
  }, [inView, hasNextPage, isFetching, throttledFetch]);

  if (isError) {
    return (
      <div className="mt-20 text-center font-bold text-red-500">
        데이터를 불러오는 중 에러가 발생했습니다.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isPending ? (
          <LpCardSkeletonList count={12} />
        ) : (
          data?.pages
            ?.map((page) => page.data.data)
            ?.flat()
            ?.map((lp) => (
              <LpCard key={lp.id} lp={lp} />
            ))
        )}

        {isFetching && !isPending && (
          <LpCardSkeletonList count={4} />
        )}
      </div>

      <div ref={ref} className="h-10 w-full" />

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-10 right-10 w-16 h-16 bg-gray-400 text-white text-4xl rounded-full shadow-2xl hover:bg-blue-400 active:scale-95 transition-all z-40 grid place-items-center font-light"
      >
        +
      </button>

      {isModalOpen && (
        <LpUploadModal
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default HomePage;