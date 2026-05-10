import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";

function useGetLpDetail(lpid: string | undefined) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, lpid],
    enabled: !!lpid,

    queryFn: () => {
      if (!lpid) {
        throw new Error("lpid가 없습니다.");
      }
      return getLpDetail(lpid);
    },

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetLpDetail;