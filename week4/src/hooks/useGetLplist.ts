import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../types/common";
import { getLpList } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";
import type { Lp } from "../types/lp";

function useGetLpList({ cursor, search, order, limit, sort }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order, sort],
    queryFn: () => getLpList({ cursor, search, order, limit, sort }),

    
    staleTime: 5 * 60 * 1000,
    gcTime: 100 * 60 * 10,

    
    retry: 3,

    select: (data) => data.data.data as unknown as Lp[],
  });
}

export default useGetLpList;