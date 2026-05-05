import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import LpCard from "./LpCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorFallback from "./ErrorFallback";

export default function LpList({ sort }: { sort: string }) {
    // 1. 바닥을 감지하는 센서 역할을 하는 ref
    const { ref, inView } = useInView();

    const { 
        data, 
        isLoading, 
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['lps', sort], 
        queryFn: async ({ pageParam }) => {
            const cursorParam = pageParam ? `&cursor=${pageParam}` : "";
            const res = await axios.get(
                `http://localhost:8000/v1/lps?limit=9&order=${sort}${cursorParam}`
            );
            return res.data.data.data; 
        },
        initialPageParam: null as number | null,
        getNextPageParam: (lastPage: any) => {
            if (!lastPage || lastPage.length < 9) return undefined;
            const lastItem = lastPage[lastPage.length - 1];
            return lastItem.id;
        }
    });

    // 2. 센서(ref)가 화면에 보이면(inView) 다음 페이지를 불러옴
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const allLps = data?.pages.flat() || [];

    if (isLoading) return <LoadingSpinner/>;
    if (isError) return <ErrorFallback/>;

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allLps.map((lp: any) => (
                    <LpCard key={lp.id} lp={lp} />
                ))}
            </div>

            {/* 3. 자동 스크롤 트리거 (바닥 센서) */}
            <div ref={ref} className="h-20 flex items-center justify-center mt-10">
                {isFetchingNextPage ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                ) : hasNextPage ? (
                    <p className="text-gray-400">스크롤을 내려 더 많은 LP를 확인하세요</p>
                ) : (
                    <p className="text-gray-300 font-medium">모든 LP를 다 불러왔습니다.</p>
                )}
            </div>
        </div>
    );
}