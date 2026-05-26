import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../../apis/axios";

const useComments = (lpId: string, order: string) => {
  return useInfiniteQuery({
    queryKey: ["lpComments", lpId, order], // ⭐ 핵심

    initialPageParam: 0,

    queryFn: async ({ pageParam = 0 }) => {
      const res = await api.get(`/v1/lps/${lpId}/comments`, {
        params: {
          cursor: pageParam,
          limit: 10,
          order,
        },
      });

      return res.data;
    },

    getNextPageParam: (lastPage: any) => {
      return lastPage?.data?.nextCursor ?? undefined;
    },
  });
};

export default useComments;