import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios";

interface LpUploadModalProps {
  onClose: () => void;
}

const LpUploadModal = ({ onClose }: LpUploadModalProps) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (targetTag: string) => {
    setTags(tags.filter((tag) => tag !== targetTag));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const requestBody = {
        title: title,
        content: content,
        thumbnail: previewUrl || "https://example.com/default.png",
        tags: tags,
        published: true
      };
    
      return axiosInstance.post("/v1/lps", requestBody);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["infiniteLpList"] });
      onClose();
      alert("LP가 성공적으로 등록되었습니다!");
    },
    onError: (error: any) => {
      console.error("등록 실패 사유:", error.response?.data || error.message);
      alert("등록에 실패했습니다. 로그인을 다시 확인해주세요.");
    },
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl text-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
            onClick={onClose} 
            className="absolute top-5 right-6 text-2xl text-gray-400 hover:text-gray-600 transition-colors"
        >
            ×
        </button>

        <div className="flex flex-col items-center mb-8">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-44 h-44 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 cursor-pointer hover:border-blue-400 transition-all flex items-center justify-center group"
          >
            {previewUrl ? (
              <img src={previewUrl} className="w-full h-full object-cover" alt="preview" />
            ) : (
              <div className="flex flex-col items-center text-gray-400 group-hover:text-blue-500">
                <span className="text-sm font-medium">이미지 선택</span>
              </div>
            )}
          </div>
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageChange} accept="image/*" />
        </div>

        <div className="space-y-4">
          <input 
              className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl outline-none focus:border-blue-400 focus:bg-white transition-all"
              placeholder="LP Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
          />
          
          <input 
              className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl outline-none focus:border-blue-400 focus:bg-white transition-all"
              placeholder="LP Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
          />
          
          <div className="flex gap-2">
            <input 
              className="flex-1 bg-gray-50 border border-gray-200 p-3.5 rounded-xl outline-none focus:border-blue-400 focus:bg-white transition-all"
              placeholder="LP Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            />
            <button 
              onClick={handleAddTag}
              className="bg-blue-500 px-6 py-2 rounded-xl font-bold text-white hover:bg-blue-600 active:scale-95 transition-all shadow-md"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[32px]">
            {tags.map((tag) => (
              <span key={tag} className="bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                #{tag}
                <button onClick={() => handleRemoveTag(tag)} className="hover:text-blue-800 ml-1">×</button>
              </span>
            ))}
          </div>

          <button 
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            className={`w-full py-4 rounded-2xl font-bold text-lg mt-4 transition-all shadow-lg ${
                mutation.isPending 
                ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                : "bg-blue-500 text-white hover:bg-blue-600 active:scale-[0.98]"
            }`}
          >
            {mutation.isPending ? "저장 중..." : "Add LP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LpUploadModal;