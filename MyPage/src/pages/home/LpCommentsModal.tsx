import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";

import type { Comment } from "../../types/Comment";
import { useCommentScroll } from "../../hooks/useCommentScroll";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useUserContext } from "../../context/UserContext";
import commentRepository from "../../repositories/commentRepository";

interface LpCommentsModalProps {
    lpId: number;
    onClose: () => void;
}

export default function LpCommentsModal({ lpId, onClose }: LpCommentsModalProps) {
    const [input, setInput] = useState("");
    const queryClient = useQueryClient();

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editInput, setEditInput] = useState("");

    const { comments, isLoading, isError, isFetchingNextPage, bottomRef } = useCommentScroll(lpId);

    const { mutate: addComment, isPending } = useMutation({
        mutationFn: (content: string) => commentRepository.create(lpId, content),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
            setInput("");
        },
        onError: (error) => alert(error.message),
    });

    const { mutate: editComment } = useMutation({
        mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
            commentRepository.update(lpId, commentId, content),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
            setEditingId(null);
            setEditInput("");
        },
        onError: (error) => alert(error.message)
    });

    const { mutate: removeComment } = useMutation({
        mutationFn: (commentId: number) => commentRepository.delete(lpId, commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
        },
        onError: (error) => alert(error.message),
    });

    const handleSubmit = () => {
        if (!input.trim()) return;
        addComment(input);
    };

    const { user } = useUserContext();

    return (
        <div className="
            fixed inset-0
            bg-black/50
            flex items-center justify-center
            z-101"
            onClick={onClose}
        >
            <div className="
                bg-white
                rounded-xl p-6
                w-[90vw] max-w-[800px]
                flex flex-col gap-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 헤더 */}
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-medium">댓글</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl cursor-pointer">
                        ✕
                    </button>
                </div>

                {/* 댓글 목록 */}
                <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
                    {isLoading && <LoadingSpinner title="댓글을 불러오는 중..."/>}
                    {isError && <p className="text-sm text-red-400">댓글을 불러오지 못했습니다.</p>}
                    {comments.map((comment: Comment) => (
                        <div key={comment.id} className="flex justify-between">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">{comment.author.name}</span>
                                    <span className="text-xs text-gray-400">
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                { comment.author.id === user?.id && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => { setEditingId(comment.id); setEditInput(comment.content); }}
                                            className="text-xs text-gray-400 hover:text-blue-400 transition"
                                        >
                                            수정
                                        </button>
                                        <button
                                            onClick={() => removeComment(comment.id)}
                                            className="text-xs text-gray-400 hover:text-red-400 transition"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                )}
                            </div>
                            { editingId === comment.id ? (
                                <div className="flex gap-2">
                                    <input
                                        className="border rounded-lg px-3 py-2 text-sm flex-1"
                                        value={editInput}
                                        onChange={(e) => setEditInput(e.target.value)}
                                    />
                                    <button
                                        className="bg-black text-white 
                                            rounded-lg py-1 px-3 
                                            text-sm 
                                            hover:opacity-80 transition"
                                        onClick={() => editComment({ commentId: comment.id, content: editInput })}
                                    >
                                        저장
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="text-sm text-gray-400 hover:text-gray-700"
                                    >
                                        취소
                                    </button>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-700">
                                    {comment.content}
                                </p>
                            )}
                        </div>
                    ))}
                    { !isLoading && comments.length === 0 && (
                        <p className="text-sm text-gray-400">아직 댓글이 없어요.</p>
                    )}
                    <div ref={bottomRef} />
                    { isFetchingNextPage && <LoadingSpinner title="댓글을 불러오는 중..."/> }
                </div>

                {/* 댓글 입력 */}
                <div className="flex gap-2">
                    <input
                        className="border rounded-lg px-3 py-2 text-sm flex-1"
                        placeholder="댓글을 입력해주세요."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    />
                    <button
                        className="bg-black text-white rounded-lg py-2 px-4 text-sm font-medium hover:opacity-80 transition disabled:opacity-50"
                        onClick={handleSubmit}
                        disabled={isPending}
                    >
                        {isPending ? "..." : "추가"}
                    </button>
                </div>
            </div>
        </div>
    )
}