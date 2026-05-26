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

  const throttledFetch = useThrottle(() => {
    console.log("Throttle");
    fetchNextPage();
  }, 3000);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | null = null;

    const checkAndFetch = () => {
      if (inView && hasNextPage && !isFetching) {
        throttledFetch();
      }

      if (inView && hasNextPage) {
        timerId = setTimeout(checkAndFetch, 300);
      }
    };

    checkAndFetch();

    return () => {
      if (timerId) clearTimeout(timerId);
    };
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