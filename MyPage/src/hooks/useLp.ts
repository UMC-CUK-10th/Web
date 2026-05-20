import { useQuery } from "@tanstack/react-query";
import lpRepository from "../repositories/lpRepository";

export function useLp(id?: string) {
  return useQuery({
    queryKey: ['lp', Number(id)],
    queryFn: () => {
      if (!id) throw new Error("ID가 없습니다.");
      return lpRepository.getLp(Number(id));  // 여기서 Promise<LpDetail> 반환
    },
    enabled: !!id,
  });
}