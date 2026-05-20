import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "../../context/UserContext";
import { useState, useEffect, useRef } from "react";

import { useLps } from "../../hooks/useLps";
import { useLpsByTag } from "../../hooks/useLpsByTag";
import { createLp } from "../../hooks/createLp";

import FloatingButton from "../../components/FloatingButton";
import LpModal from "../../components/Lp/LpModal";
import LpCard from "../../components/Lp/LpCard";
import LpSearchBar from "../../components/Lp/LpSearchBar";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import { useThrottle } from "../../hooks/useThrottle";

export default function ContentView() {
    const { user } = useUserContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tag, setTag] = useState('');
    const [debounceTag, setDebounceTag] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setDebounceTag(tag), 300);
        return () => clearTimeout(timer);
    }, [tag]);

    const lpResult = useLps(!debounceTag && !!user);
    const tagResult = useLpsByTag(debounceTag);

    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = debounceTag ? tagResult : lpResult;

    const lps = data?.pages.flatMap(page => page.data) ?? [];

    const throttledFetchNextPage = useThrottle(fetchNextPage, 500);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    throttledFetchNextPage();
                }
            },
            { threshold: 1.0 }
        );

        if (bottomRef.current) {
            observer.observe(bottomRef.current);
        }

        return () => observer.disconnect();
    }, [hasNextPage, throttledFetchNextPage]);

    const queryClient = useQueryClient();

    const { mutate: addLp, isPending } = useMutation({
        mutationFn: createLp,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["lps"] });
            setIsModalOpen(false);
        },
        onError: (error) => {
            alert(error.message);
        }
    });

    return (
        <div className="flex flex-col h-screen w-full">
            {/* 고정 검색바 */}
            <div className="px-16 py-8 w-full">
                <LpSearchBar value={tag} onChange={setTag} />
            </div>

            {/* 그리드 뷰 */}
            <div className="grid grid-cols-3 gap-4">
                {isLoading && <LoadingSpinner title="데이터를 불러오고 있습니다" />}
                {isError && <ErrorMessage message="데이터를 불러오지 못했습니다."/>}
                { lps.map((lp) => (
                    <LpCard key={lp.id} lp={lp}/>
                ))}
                <div ref={bottomRef} className="col-span-3" />
                {isFetchingNextPage && <LoadingSpinner title="불러오는 중..." />}
            </div>

            {/* 플로팅 버튼 */}
            <FloatingButton onClick={() => setIsModalOpen(true)} />
            { isModalOpen && (
                <LpModal 
                    onClose={() => setIsModalOpen(false)} 
                    onSubmit={addLp}
                    isPending={isPending}
                />
            )}
        </div>
    )
}