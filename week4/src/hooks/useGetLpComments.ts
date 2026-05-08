import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpComments } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";

const useGetLpComments = (lpid: string, order: "asc" | "desc") => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.comments, lpid, order],
    queryFn: ({ pageParam = 0 }) =>
      getLpComments({ lpid, order, cursor: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage?.data?.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
};

export default useGetLpComments;