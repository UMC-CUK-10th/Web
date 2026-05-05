import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import axios from "axios";
import { X, Send, MessageSquare } from "lucide-react";
import CommentSkeleton from "./CommentSkeleton";

interface LpCommentsProps {
    lpId: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function LpComments({ lpId, isOpen, onClose }: LpCommentsProps) {
    const { ref, inView } = useInView();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useInfiniteQuery({
        queryKey: ["comments", lpId], // lpId별로 쿼리 키를 분리
        queryFn: async ({ pageParam = 0 }) => {
            // 1. 저장된 토큰 가져오기
            const token = localStorage.getItem("accessToken");

            const res = await axios.get(
                `http://localhost:8000/v1/lps/${lpId}/comments?limit=10&cursor=${pageParam}`,
                {
                    // 2. 헤더에 인증 정보 추가
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return res.data.data.data;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage || lastPage.length < 10) return undefined;
            return allPages.length * 10;
        },
        enabled: isOpen, // 💡 중요: 댓글창이 열렸을 때만 API 요청을 시작함
    });

    // 바닥 감지 시 다음 페이지 로드
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const allComments = data?.pages.flat() || [];

    const uniqueComments = Array.from(
        new Map(allComments.map((item) => [item.id, item])).values()
    );

    return (
        <>
            {/* 배경 오버레이 */}
            <div
                className={`fixed inset-0 bg-black/40 transition-opacity z-[10000] ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={onClose}
            />

            {/* 슬라이드 창 */}
            <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 z-[10001] ${isOpen ? "translate-y-0" : "translate-y-full"}`}
                style={{ height: '80vh' }}
            >
                {/* 헤더 */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center gap-2">
                        <MessageSquare size={20} />
                        <h2 className="text-xl font-bold">댓글</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* 댓글 목록 영역 */}
                <div className="overflow-y-auto p-6 space-y-6" style={{ height: 'calc(100% - 160px)' }}>
                    {isLoading ? (
                        <div className="space-y-6">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <CommentSkeleton key={i} />
                            ))}
                        </div>
                    ) : uniqueComments.length > 0 ? (
                        uniqueComments.map((comment: any) => (
                            <div key={comment.id} className="flex gap-4 border-b border-gray-50 pb-4">
                                {/* 작성자 아바타 (예시) */}
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-blue-200 flex-shrink-0" />
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-sm">{comment.author?.name || "익명 사용자"}</span>
                                        <span className="text-xs text-gray-400">
                                            {new Date(comment.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 text-gray-400">
                            첫 번째 댓글을 남겨보세요!
                        </div>
                    )}

                    {/* 무한 스크롤 트리거 */}
                    <div ref={ref} className="h-10">
                        {isFetchingNextPage && <div className="text-center text-xs text-gray-400">더 불러오는 중...</div>}
                    </div>
                </div>

                {/* 댓글 입력창 */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t pb-8">
                    <div className="flex gap-3 max-w-4xl mx-auto items-center">
                        <input
                            type="text"
                            placeholder="댓글을 남겨주세요."
                            className="flex-1 p-3 rounded-2xl bg-gray-100 border-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        <button className="bg-blue-600 text-white p-3 rounded-2xl hover:bg-blue-700 shadow-md transition-all active:scale-95">
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}