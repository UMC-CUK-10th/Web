import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../../apis/axios";

const useGetLPList = (order: string) => {
  return useInfiniteQuery({
    queryKey: ["lps", order],

    initialPageParam: 0,

    queryFn: async ({ pageParam = 0 }) => {
      const res = await api.get("/v1/lps", {
        params: {
          cursor: pageParam,
          limit: 10,
          order,
        },
      });

      return res.data;
    },

    getNextPageParam: (lastPage: any) => {
      // ⭐ 핵심: hasNext 먼저 체크
      if (!lastPage?.data?.hasNext) return undefined;

      return lastPage?.data?.nextCursor ?? undefined;
    },
  });
};

export default useGetLPList;