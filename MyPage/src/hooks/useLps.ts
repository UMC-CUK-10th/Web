import { useInfiniteQuery } from "@tanstack/react-query";
import lpRepository from "../repositories/lpRepository";

export function useLps(enabled = true) {
    return useInfiniteQuery({
        queryKey: ["lps"],
        queryFn: ({ pageParam }) => lpRepository.getList(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.hasNext ? lastPage.nextCursor : undefined
        },
        enabled
    });
}