import { useState, useRef, useEffect } from "react";
import { useCreateLp } from "../hooks/mutations/useCreateLp";

interface LpCreateModalProps {
  onClose: () => void;
}

const DEFAULT_THUMBNAIL_URL = "https://images.unsplash.com/photo-1539375665275-f9ad415ef9ac?q=80&w=500&auto=format&fit=crop";

export default function LpCreateModal({ onClose }: LpCreateModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createLp, isPending } = useCreateLp();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // 1. 최대 해상도 설정 (500px)
        const MAX_WIDTH = 500;
        const MAX_HEIGHT = 500;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
        setImagePreview(compressedDataUrl);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (!trimmedTag || tags.includes(trimmedTag)) return;
    setTags((prev) => [...prev, trimmedTag]);
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: title.trim(),
      content: content.trim(),
      thumbnail: imagePreview || DEFAULT_THUMBNAIL_URL, 
      tags: tags.map((tag) => tag.trim()).filter(Boolean),
      published: true,
    };

    if (!payload.title || !payload.content) {
      alert("LP 제목과 내용을 입력해주세요.");
      return;
    }

    if (payload.tags.length === 0) {
      alert("태그를 최소 1개 이상 추가해주세요.");
      return;
    }

    createLp(payload, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.error("등록 실패:", error);
        alert("서버 오류가 발생했습니다. 사진 용량을 조금 더 줄여보거나 다른 사진을 선택해 주세요.");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#000d1a]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-[420px] rounded-[40px] bg-[#001a2c] border border-blue-900/40 p-10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] text-white">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-8 top-8 text-blue-900 hover:text-blue-400 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <header className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tighter">
            <span className="text-blue-500">NEW</span> RELEASE
          </h2>
          <p className="mt-1 text-[10px] tracking-[0.4em] text-blue-900 font-black uppercase">
            Custom Image Archive
          </p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="group relative h-48 w-48 cursor-pointer overflow-hidden rounded-full border-2 border-dashed border-blue-900/40 bg-[#000d1a] transition-all hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center text-blue-900">
                  <svg className="mb-2 transition-transform group-hover:scale-110" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  <span className="text-[9px] font-black tracking-[0.2em] uppercase">Upload Cover</span>
                </div>
              )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            <p className="text-[10px] text-blue-900/60">* 이미지는 자동으로 최적화되어 등록됩니다.</p>
          </div>

          <div className="flex flex-col gap-3 text-white">
            <input
              type="text"
              placeholder="Record Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-2xl border border-blue-900/30 bg-[#000d1a]/50 px-6 py-4 text-sm outline-none focus:border-blue-500 transition-all"
              required
            />
            <textarea
              placeholder="Share the story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-28 rounded-2xl border border-blue-900/30 bg-[#000d1a]/50 px-6 py-4 text-sm outline-none focus:border-blue-500 transition-all resize-none"
              required
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddTag(); } }}
                className="flex-1 rounded-2xl border border-blue-900/30 bg-[#000d1a]/50 px-6 py-4 text-sm outline-none focus:border-blue-500"
              />
              <button type="button" onClick={handleAddTag} className="rounded-2xl bg-blue-900/20 px-6 text-[11px] font-black text-blue-400 hover:bg-blue-900/40">ADD</button>
            </div>
            <div className="flex flex-wrap gap-2 min-h-[32px] px-1">
              {tags.map((tag) => (
                <span key={tag} className="flex items-center gap-2 rounded-full bg-blue-950/50 border border-blue-900/30 px-4 py-1.5 text-[10px] font-bold text-blue-300">
                  #{tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="text-blue-900 hover:text-red-500">×</button>
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-4 w-full rounded-2xl bg-blue-600 py-5 text-[13px] font-black tracking-[0.3em] transition-all hover:bg-blue-500 hover:shadow-[0_10px_30px_rgba(37,99,235,0.3)] disabled:bg-blue-950 disabled:text-blue-900"
          >
            {isPending ? "COMPRESSING & SAVING..." : "CREATE RECORD"}
          </button>
        </form>
      </div>
    </div>
  );
}