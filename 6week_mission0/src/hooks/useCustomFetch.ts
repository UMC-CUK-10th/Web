import { useQuery } from '@tanstack/react-query';

export const useCustomFetch = <T>(url: string) => {
  return useQuery({
    queryKey: [url], // URL을 쿼리 키로 사용
    queryFn: async ({ signal }) => {
      const response = await fetch(url, { signal });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json() as Promise<T>;
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * Math.pow(2, attemptIndex), 30000),
    staleTime: 5 * 60 * 1000, // 5분 (캐시 신선도 유지 시간)
    gcTime: 10 * 60 * 1000, // 10분 (사용하지 않는 캐시 가비지 컬렉션 타임)
  });
};