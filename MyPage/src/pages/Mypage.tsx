import { useUser } from "../hooks/useUser";
import { useState } from "react";
import type { UpdateUserRequest } from "../types/User";


export default function Mypage() {
    
    const { user, logout, updateUser, isUpdating } = useUser();

    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState<UpdateUserRequest>({
        name: user?.name ?? "",
        bio: user?.bio ?? null,
        avatar: user?.avatar ?? null,
    });

    if (!user) return <div className="text-sm text-gray-400">유저가 없습니다.</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        {user ? (
            <div className="flex flex-col items-center gap-4 bg-white rounded-xl p-8 w-[90vw] max-w-[400px] border border-gray-100">
            
                {/* 아바타 */}
                {user.avatar ? (
                    <img src={user.avatar} className="w-20 h-20 rounded-full object-cover" />
                ): (
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-medium text-gray-600">
                        {user.name.charAt(0)}
                    </div>
                )}

                { isEditing ? (
                    <div className="flex flex-col gap-3 w-full">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-400">이름</label>
                            <input
                                className="border rounded-lg px-3 py-2 text-sm"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-400">한 줄 소개</label>
                            <input
                                className="border rounded-lg px-3 py-2 text-sm"
                                value={form.bio ?? ""}
                                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-400">아바타 URL</label>
                            <input
                                className="border rounded-lg px-3 py-2 text-sm"
                                placeholder="https://example.com/avatar.jpg"
                                value={form.avatar ?? ""}
                                onChange={(e) => setForm({ ...form, avatar: e.target.value || null })}
                            />
                        </div>

                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => updateUser(form, {
                                    onSuccess: () => setIsEditing(false)
                                })}
                                disabled={isUpdating}
                                className="flex-1 bg-black text-white rounded-lg py-2 text-sm font-medium hover:opacity-80 transition disabled:opacity-50"
                            >
                                {isUpdating ? "저장 중..." : "저장"}
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="flex-1 border rounded-lg py-2 text-sm text-gray-500 hover:bg-gray-50 transition"
                            >
                                취소
                            </button>
                        </div>
                    </div>
                ) : (
                    // 프로필 유저 정보
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-lg font-medium">{user.name}</span>
                        <span className="text-sm text-gray-400">{user.email}</span>
                        <p className="text-sm text-gray-400">
                            {user.bio ?? "한 줄 소개가 없습니다."}
                        </p>

                        <button
                            onClick={() => {
                                setForm({ name: user.name, bio: user.bio, avatar: user.avatar });
                                setIsEditing(true);
                            }}
                            className="mt-4 w-full border rounded-lg py-2 text-sm text-gray-500 hover:bg-gray-50 transition"
                        >
                            프로필 수정
                        </button>
                        <button
                            onClick={logout}
                            className="mt-2 w-full border rounded-lg py-2 text-sm text-gray-500 hover:bg-gray-50 transition"
                        >
                            로그아웃
                        </button>
                    </div>
                )}
            </div>
        ) : (
            <div className="text-sm text-gray-400">유저가 없습니다.</div>
        )}
        </div>
    );
}