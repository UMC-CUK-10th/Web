import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { Heart, Edit3, Trash2, Calendar, ChevronLeft } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorFallback from "../components/ErrorFallback";
import FloatingButton from "../components/FloatingButton";
import LpComments from "../components/LpComments";

export default function LpDetail() {
  const { id } = useParams<{ id: string }>();
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const navigate = useNavigate();

  const { data: lp, isLoading, isError } = useQuery({
    queryKey: ['lp', id], 
    queryFn: () => axios.get(`http://localhost:8000/v1/lps/${id}`).then(res => res.data.data),
    enabled: !!id, 
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError || !lp) return <ErrorFallback title="데이터를 불러오지 못했습니다" />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 hover:text-black mb-6 transition-colors"
      >
        <ChevronLeft size={20} />
        <span>뒤로</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square w-full overflow-hidden rounded-2xl shadow-2xl">
          <img 
            src={lp.thumbnail} 
            alt={lp.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between py-2">
          <div>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
              <Calendar size={16} />
              <span>{new Date(lp.createdAt).toLocaleDateString()} 업로드</span>
            </div>
            
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              {lp.title}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1.5 bg-rose-50 text-rose-600 px-4 py-2 rounded-full font-bold">
                <Heart size={20} fill="currentColor" />
                <span>{lp.likes?.length || 0}</span>
              </div>
            </div>
          </div>

          {/* 버튼 그룹 */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button className="flex-1 flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-rose-200">
              <Heart size={20} />
              좋아요
            </button>
            
            <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-bold transition-all">
              <Edit3 size={20} />
              수정하기
            </button>

            <button className="p-3 flex items-center justify-center bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all border border-gray-100">
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-gray-100 pt-10">
        <h3 className="text-xl font-bold text-gray-900 mb-6">LP 소개</h3>
        <div className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
          {lp.content || "상세 설명이 등록되지 않았습니다."}
        </div>
      </div>
      { id && (
        <FloatingButton 
          onClick={() => setIsCommentOpen(true)} 
        />
      )}

      {id && (
        <LpComments 
          lpId={id} 
          isOpen={isCommentOpen} 
          onClose={() => setIsCommentOpen(false)} 
        />
      )}
    </div>
  );
}