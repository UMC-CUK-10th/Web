import { useInfiniteQuery } from "@tanstack/react-query";
import lpRepository from "../repositories/lpRepository";

export function useLpsByTag(tag: string) {
    return useInfiniteQuery({
        queryKey: ['lps', 'tag', tag],
        queryFn: ({ pageParam }) => lpRepository.getLpWithTag(tag, pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage) =>
            lastPage.hasNext ? lastPage.nextCursor : undefined,
        enabled: !!tag
    });
}