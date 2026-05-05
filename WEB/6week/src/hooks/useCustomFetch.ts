import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const useCustomFetch = <T>(url: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: async ({ signal }) => {
      const { data } = await api.get<T>(url, { signal });
      return data;
    },

    retry: 10,

    retryDelay: (attemptIndex) => {
      const delay = Math.min(1000 * Math.pow(2, attemptIndex), 30000);
      console.log(`재시도 ${attemptIndex + 1}회째: ${delay}ms 후 다시 시도합니다... 🐾`);
      return delay;
    },

    // 5분 동안은 신선한 데이터로 간주 
    staleTime: 5 * 60 * 1000,
    // 10분 후 가비지 컬렉션
    gcTime: 10 * 60 * 1000,
  });
};