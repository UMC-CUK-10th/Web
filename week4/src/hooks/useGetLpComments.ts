import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpComments } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";

const useGetLpComments = (lpId: string, order: "asc" | "desc") => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lpComments, lpId, order],
    queryFn: ({ pageParam = 0 }) =>
      getLpComments({ lpid: lpId, order, cursor: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor ?? undefined : undefined;
    },
    enabled: !!lpId,
  });
};

export default useGetLpComments;
