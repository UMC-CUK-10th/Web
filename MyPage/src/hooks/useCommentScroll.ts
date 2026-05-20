import { useComments } from "./useComments";
import { useRef, useEffect } from "react";

export function useCommentScroll(lpId: number) {
    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useComments(lpId);
    const comments = data?.pages.flatMap(page => page.data) ?? [];
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1.0 }
        );

        if (bottomRef.current) {
            observer.observe(bottomRef.current);
        }

        return () => observer.disconnect();
    }, [hasNextPage, fetchNextPage]);

    return { comments, isLoading, isError, isFetchingNextPage, bottomRef }
}