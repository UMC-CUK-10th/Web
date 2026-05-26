import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../../apis/axios";

const useGetLPList = (order: string, search: string) => {
  return useInfiniteQuery({
    queryKey: ["lps", order, search], // ⭐ search 추가 (중요)

    initialPageParam: 0,

    queryFn: async ({ pageParam = 0 }) => {
      const res = await api.get("/v1/lps", {
        params: {
          cursor: pageParam,
          limit: 10,
          order,
          search: search?.trim() || undefined, // ⭐ 빈값이면 요청 안 보냄
        },
      });

      return res.data;
    },

    getNextPageParam: (lastPage: any) => {
      // ⭐ 다음 페이지 여부 체크
      if (!lastPage?.data?.hasNext) return undefined;

      return lastPage?.data?.nextCursor ?? undefined;
    },
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
  });
};

export default useGetLPList;