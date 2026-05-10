import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";

type LpItem = {
  id: number;
  title: string;
};

type LpListResponse = {
  items: LpItem[];
  nextCursor?: number;
};

const fetchLps = async ({
  pageParam = 0,
  queryKey,
}: {
  pageParam?: number;
  queryKey: (string | undefined)[];
}): Promise<LpListResponse> => {
  const sort = queryKey[1] ?? "latest";
  const res = await fetch(`/api/lps?sort=${sort}&cursor=${pageParam}`);
  return res.json() as Promise<LpListResponse>;
};

const SkeletonCard = () => (
  <div className="w-full h-32 bg-gray-200 rounded-lg animate-pulse mb-4" />
);

const MainPage = () => {
  const sort = "latest"; // or from state
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["lps", sort],
    queryFn: fetchLps,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: 0,
  });

  const observerRef = useRef<HTMLDivElement>(null);
  return (
    <div className="p-8">
      {/* Skeletons for initial loading */}
      {isLoading && (
        <div>
          {[...Array(5)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* List rendering */}
      {data?.pages.map((page) =>
        page.items.map((item) => (
          <div key={item.id} className="w-full h-32 bg-white rounded-lg mb-4 shadow">
            {item.title}
          </div>
        ))
      )}

      {/* Skeletons for fetching next page */}
      {isFetchingNextPage && (
        <div>
          {[...Array(2)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Infinite scroll observer */}
      <div ref={observerRef} />

      {/* Manual fetch button for demo */}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          더 보기
        </button>
      )}
    </div>
  );
};

export default MainPage;
