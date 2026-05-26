import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios";
import { getLpDetail } from "../apis/lp";

const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [commentInput, setCommentInput] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editCommentValue, setEditCommentValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [displayData, setDisplayData] = useState({ title: "", content: "", thumbnail: "" });

  const { data: lp, isLoading: isLpLoading } = useQuery({
    queryKey: ["lp", lpid],
    queryFn: async () => {
      const res = await getLpDetail(lpid!);
      return res.data || res;
    },
    enabled: !!lpid,
  });

  useEffect(() => {
    if (lp) {
      setDisplayData({
        title: lp.title || "",
        content: lp.content || "",
        thumbnail: lp.thumbnail || "",
      });
    }
  }, [lp]);

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axiosInstance.post("/v1/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data?.data?.imageUrl || res.data?.imageUrl;
    },
    onSuccess: (imageUrl) => setDisplayData((prev) => ({ ...prev, thumbnail: imageUrl })),
  });

  const updateLpMutation = useMutation({
    mutationFn: (body: typeof displayData) => axiosInstance.patch(`/v1/lps/${lpid}`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lp", lpid] });
      alert("변경 사항이 저장되었습니다.");
      setIsEditing(false);
    },
  });

  const deleteLpMutation = useMutation({
    mutationFn: () => axiosInstance.delete(`/v1/lps/${lpid}`),
    onSuccess: () => {
      alert("LP가 삭제되었습니다.");
      navigate("/", { replace: true });
    },
    onError: (error: any) => alert("삭제 실패: " + (error.response?.data?.message || "권한이 없습니다."))
  });

  const { data: commentsData } = useQuery({
    queryKey: ["lp-comments", lpid],
    queryFn: async () => {
      const res = await axiosInstance.get(`/v1/lps/${lpid}/comments`);
      return res.data;
    },
    enabled: !!lpid,
  });

  const commentMutation = useMutation({
    mutationFn: (content: string) => axiosInstance.post(`/v1/lps/${lpid}/comments`, { content }),
    onSuccess: () => { setCommentInput(""); queryClient.invalidateQueries({ queryKey: ["lp-comments", lpid] }); }
  });

  const editCommentMutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) => 
      axiosInstance.patch(`/v1/lps/${lpid}/comments/${commentId}`, { content }),
    onSuccess: () => {
      setEditingCommentId(null);
      queryClient.invalidateQueries({ queryKey: ["lp-comments", lpid] });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => axiosInstance.delete(`/v1/lps/${lpid}/comments/${commentId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["lp-comments", lpid] })
  });

  if (isLpLoading) return <div className="p-20 text-center text-gray-400 font-bold">로딩 중...</div>;

  const comments = Array.isArray(commentsData?.data?.data || commentsData?.data || commentsData) 
    ? [...(commentsData?.data?.data || commentsData?.data || commentsData)].reverse() 
    : [];

  return (
    <main className="max-w-5xl mx-auto p-6 md:p-12 bg-white min-h-screen">
      <style>{`
        @keyframes spin-lp { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-lp-spin { animation: spin-lp 10s linear infinite !important; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="flex justify-between items-center mb-10">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-black font-medium transition-colors">← Back</button>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <button onClick={() => setIsEditing(true)} className="px-4 py-2 hover:bg-gray-100 rounded-full text-sm font-medium text-gray-600 transition-all">수정</button>
              <button 
                onClick={() => window.confirm("이 LP를 정말 삭제하시겠습니까?") && deleteLpMutation.mutate()} 
                className="px-4 py-2 hover:bg-red-50 rounded-full text-red-500 text-sm font-medium transition-all"
              >삭제</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 hover:bg-gray-100 rounded-full text-sm font-medium text-gray-400 transition-all">취소</button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="flex flex-col items-center gap-6">
          <div className={`relative ${!isEditing && "animate-lp-spin"}`}>
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-[12px] border-[#111] ring-8 ring-white/10">
              <img src={displayData.thumbnail} alt="" className={`w-full h-full object-cover ${uploadMutation.isPending ? 'opacity-40' : 'opacity-100'}`} />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border border-gray-300 shadow-inner"></div>
          </div>
          {isEditing && (
            <>
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && uploadMutation.mutate(e.target.files[0])} />
              <button onClick={() => fileInputRef.current?.click()} className="bg-black text-white px-6 py-2 rounded-full text-sm font-bold shadow-md active:scale-95 transition-all">사진 직접 고르기</button>
            </>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {!isEditing ? (
            <div className="animate-fade-in">
              <h1 className="text-4xl font-black text-gray-900 leading-tight">{displayData.title}</h1>
              <p className="mt-4 bg-gray-50 p-8 rounded-[2rem] border border-gray-100 italic text-gray-700 leading-relaxed shadow-sm text-lg">"{displayData.content}"</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 animate-fade-in">
              <input className="w-full border rounded-2xl px-6 py-4 font-bold text-lg outline-none focus:ring-2 focus:ring-blue-400" value={displayData.title} onChange={(e) => setDisplayData({...displayData, title: e.target.value})} />
              <textarea className="w-full border rounded-[2rem] px-6 py-6 min-h-[150px] resize-none outline-none focus:ring-2 focus:ring-blue-400" value={displayData.content} onChange={(e) => setDisplayData({...displayData, content: e.target.value})} />
              <button onClick={() => updateLpMutation.mutate(displayData)} disabled={updateLpMutation.isPending} className="bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 shadow-lg active:scale-95 transition-all disabled:bg-gray-300">
                {updateLpMutation.isPending ? "저장 중..." : "변경 사항 저장하기"}
              </button>
            </div>
          )}
        </div>
      </div>

      <section className="bg-gray-100/60 rounded-[3rem] p-8 md:p-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">댓글 <span className="text-blue-500">{comments.length}</span></h2>
        
        <div className="flex gap-3 mb-10">
          <input value={commentInput} onChange={(e) => setCommentInput(e.target.value)} className="flex-1 bg-white border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-400 shadow-sm" placeholder="댓글을 남겨보세요..." />
          <button onClick={() => commentInput.trim() && commentMutation.mutate(commentInput)} className="bg-gray-800 text-white px-8 rounded-2xl font-bold hover:bg-black transition-all active:scale-95 shadow-md">작성</button>
        </div>

        <div className="space-y-6">
          {comments.map((comment: any) => (
            <div key={comment.id} className="flex gap-4 items-start animate-fade-in">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold shrink-0 shadow-sm">{comment.author?.name?.[0] || "U"}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-sm">{comment.author?.name || "익명"}</span>
                    <span className="text-[10px] text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  {(comment.isMine || comment.author?.id === lp?.authorId) && editingCommentId !== comment.id && (
                    <div className="flex gap-2 text-[10px] text-gray-400">
                      <button onClick={() => { setEditingCommentId(comment.id); setEditCommentValue(comment.content); }} className="hover:text-blue-500">수정</button>
                      <button onClick={() => window.confirm("댓글을 삭제할까요?") && deleteCommentMutation.mutate(comment.id)} className="hover:text-red-500">삭제</button>
                    </div>
                  )}
                </div>

                {editingCommentId === comment.id ? (
                  <div className="flex flex-col gap-2 mt-2">
                    <input className="w-full bg-white border border-blue-300 rounded-xl px-4 py-2 text-sm outline-none shadow-sm" value={editCommentValue} onChange={(e) => setEditCommentValue(e.target.value)} autoFocus />
                    <div className="flex gap-2">
                      <button onClick={() => editCommentMutation.mutate({ commentId: comment.id, content: editCommentValue })} className="text-[10px] bg-blue-500 text-white px-3 py-1 rounded-lg shadow-sm">저장</button>
                      <button onClick={() => setEditingCommentId(null)} className="text-[10px] bg-gray-200 text-gray-600 px-3 py-1 rounded-lg">취소</button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700 text-sm leading-relaxed bg-white px-4 py-2 rounded-2xl rounded-tl-none border border-white shadow-sm inline-block">{comment.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default LpDetailPage;