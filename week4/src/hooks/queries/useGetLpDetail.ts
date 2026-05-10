import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp";
import type { ResponseLpDetailDto } from "../../types/lp";

function useGetLpDetail(lpid: string) {
  return useQuery({
    queryKey: ["lp", lpid], 
    queryFn: async () => {
      const response: ResponseLpDetailDto = await getLpDetail(lpid);
      return response.data; 
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    enabled: Boolean(lpid),
  });
}

export default useGetLpDetail;