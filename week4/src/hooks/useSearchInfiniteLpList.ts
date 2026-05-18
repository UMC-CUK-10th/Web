import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../apis/lp";

function useSearchInfiniteLpList(
  limit: number,
  order: "asc" | "desc",
  search: string
) {
  const normalizedSearch = search.trim();

  return useInfiniteQuery({
    queryKey: ["search", normalizedSearch, order, limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      getLpList({
        cursor: pageParam,
        limit,
        order,
        search: normalizedSearch,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor ?? undefined : undefined;
    },
    enabled: normalizedSearch.length > 0,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}

export default useSearchInfiniteLpList;
