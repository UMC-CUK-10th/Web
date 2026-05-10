import { useInfiniteQuery } from '@tanstack/react-query';
import { getLpList } from '../../apis/lp';
import type { PaginationDto } from '../../types/common';
import { queryKey } from '../../constants/queryKey';

export const useInfiniteGetLpList = ({ limit, search, order }: Omit<PaginationDto, 'cursor'>) => {
  return useInfiniteQuery({
    queryKey: [queryKey.lps, 'infinite', search, order],
    queryFn: async ({ pageParam = 0 }) => {
      return getLpList({ cursor: pageParam, limit, search, order });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: any) => {
      // response가 { status, message, data: { data: [...], nextCursor: number, hasNext: boolean } } 형태
      const pageData = lastPage?.data;
      if (pageData?.hasNext) {
        return pageData.nextCursor;
      }
      return undefined;
    },
  });
};
