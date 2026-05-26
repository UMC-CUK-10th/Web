import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteLpList(
  limit: number,
  search: string,
  order: PAGINATION_ORDER
) {
  const trimmedSearch = search.trim();

  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, trimmedSearch, order],

    queryFn: ({ pageParam }) =>
      getLpList({
        cursor: pageParam,
        limit,
        search: trimmedSearch,
        order,
      }),

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },

    enabled: trimmedSearch.length > 0,

    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}

export default useGetInfiniteLpList;