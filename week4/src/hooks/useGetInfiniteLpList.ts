import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";

function useGetInfiniteLpList(limit: number, order: "asc" | "desc") {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, order],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      getLpList({ cursor: pageParam, limit, order }),
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor ?? undefined : undefined;
    },
  });
}

export default useGetInfiniteLpList;
