import { useInfiniteQuery } from "@tanstack/react-query";
import commentRepository from "../repositories/commentRepository";

export function useComments(lpId: number) {
  return useInfiniteQuery({
    queryKey: ['comments', lpId],
    queryFn: ({ pageParam }) => commentRepository.getList(lpId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.hasNext ? lastPage.nextCursor : undefined
  });
}