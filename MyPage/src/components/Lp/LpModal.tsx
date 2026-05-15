import { useState } from "react";
import type { LpFormData } from "../../types/LpFormData";

interface LpModalProps {
    onClose: () => void;
    onSubmit: (data: LpFormData) => void;
    isPending: boolean;
}

export default function LpModal({ onClose, onSubmit, isPending }: LpModalProps) {
    const [form, setForm] = useState<LpFormData>({ title: "", content: "", thumbnail: null, tags: [], published: true });
    const [tagInput, setTagInput] = useState("");
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setForm({ ...form, thumbnail: file });

        const url = URL.createObjectURL(file); // 미리보기용 (로컬에서만 유효한 url)
        setPreview(url); // 썸네일 업데이트
    };

    const addTag = () => {
        if (!tagInput.trim()) return;
        setForm((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
        setTagInput("");
    };

    const removeTag = (i: number) => {
        setForm((prev) => ({ ...prev, tags: prev.tags.filter((_, idx) => idx !== i) }));
    };

    return(
        <div className="
                fixed inset-0
                bg-black/50
                flex items-center justify-center
                z-100
            "
            onClick={onClose}
        >
            <div className="
                bg-white
                rounded-xl p-6
                w-[90vw] max-w-[400px]
                flex flex-col gap-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-medium">LP 추가</h2>
                    <button onClick={onClose} className="
                        text-gray-400
                        hover:text-gray-700
                        text-2xl cursor-pointer
                    ">
                        x
                    </button>
                </div>

                <input
                    className="border rounded-lg px-3 py-2 text-sm"
                    placeholder="제목"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <textarea
                    className="border rounded-lg px-3 py-2 text-sm resize-none h-20"
                    placeholder="내용"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                />
                <label className="flex flex-col items-center justify-center 
                    border-2 border-dashed rounded-lg 
                    aspect-square cursor-pointer 
                    hover:bg-gray-50 transition overflow-hidden"
                >
                    {preview ? (
                        <img src={preview} alt="썸네일 미리보기" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-sm text-gray-400">클릭해서 이미지 업로드</span>
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>

                <div className="flex gap-2">
                    <input
                        className="border rounded-lg px-3 py-2 text-sm flex-1"
                        placeholder="태그 입력 후 추가"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addTag()}
                    />
                    <button className="bg-black text-white 
                        rounded-lg py-2 px-4
                        text-sm font-medium 
                        hover:opacity-80 transition 
                        disabled:opacity-50"
                        onClick={addTag}
                    >
                        추가
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {form.tags.map((tag, i) => (
                        <span key={i} className="flex items-center gap-1 text-xs bg-gray-100 px-3 py-1 rounded-full">
                            {tag}
                            <button onClick={() => removeTag(i)} className="text-gray-400 hover:text-gray-700">✕</button>
                        </span>
                    ))}
                </div>

                <button
                    className="bg-black text-white 
                        rounded-lg py-2 
                        text-sm font-medium 
                        hover:opacity-80 transition"
                    onClick={() => onSubmit(form)}
                    disabled={isPending}
                >
                    {isPending ? "추가 중..." : "LP 추가하기"}
                </button>
            </div>
        </div>
    )
}