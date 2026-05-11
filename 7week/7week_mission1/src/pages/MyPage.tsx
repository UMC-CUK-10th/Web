import { useEffect, useState } from "react";
import { getMyInfo, updateMyInfo, deleteAccount } from "../apis/auth"; 
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const MyPage = () => {
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", bio: "", avatar: "" });

  // 초기 데이터 로드
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        setData(response);
        if (response?.data) {
          setEditForm({
            name: response.data.name || "",
            bio: response.data.bio || "",
            avatar: response.data.avatar || "",
          });
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    getData();
  }, []);

  // 1. 정보 수정 Mutation
  const updateMutation = useMutation({
    mutationFn: updateMyInfo,
    onSuccess: (updatedData) => {
      alert("정보가 수정되었습니다.");
      setData(updatedData);
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
    onError: () => alert("수정에 실패했습니다. 주소를 확인해주세요."),
  });

  // 2. 회원 탈퇴 Mutation
  const withdrawMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      alert("탈퇴되었습니다.");
      logout(); // AuthContext에 구현된 로그아웃(Mutation 기반) 호출
    },
    onError: () => alert("탈퇴 처리에 실패했습니다."),
  });

  if (!data) return <div className="text-center p-20">로딩 중...</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      {/* 상단 프로필 영역 */}
      <div className="flex flex-col items-center border-b pb-10">
        <div className="relative group">
          {/* ✅ 프로필 이미지가 있으면 띄우고, 없으면 회색 아이콘 UI 출력 */}
          {data.data.avatar ? (
            <img
              src={data.data.avatar as string}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              alt=""
            />
          ) : (
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-[#EAEAEA] flex items-center justify-center overflow-hidden">
              <svg className="w-28 h-28 text-[#C4C4C4] mt-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 mt-4">
          <h1 className="text-3xl font-bold text-gray-800">{data.data.name}</h1>
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-gray-600"
          >
            {isEditing ? "취소" : "수정"}
          </button>
        </div>
        <p className="text-gray-500 mt-1">{data.data.email}</p>
        {data.data.bio && <p className="text-gray-400 mt-2 italic text-center">"{data.data.bio}"</p>}
      </div>

      {/* 수정 UI */}
      {isEditing && (
        <div className="mt-10 bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-4 transition-all">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">정보 수정</h2>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">이름</label>
            <input 
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none" 
              value={editForm.name} 
              onChange={(e) => setEditForm({...editForm, name: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">소개</label>
            <textarea 
              className="w-full border p-2 rounded-lg h-24 focus:ring-2 focus:ring-blue-300 outline-none" 
              value={editForm.bio} 
              onChange={(e) => setEditForm({...editForm, bio: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">프로필 이미지 URL</label>
            <input 
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none" 
              value={editForm.avatar} 
              onChange={(e) => setEditForm({...editForm, avatar: e.target.value})} 
            />
          </div>
          <button 
            onClick={() => updateMutation.mutate(editForm)}
            disabled={updateMutation.isPending}
            className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
              updateMutation.isPending ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-100"
            }`}
          >
            {updateMutation.isPending ? "저장 중..." : "변경 사항 저장"}
          </button>
        </div>
      )}

      {/* 하단 버튼 영역 */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <button 
          className="text-gray-400 underline hover:text-red-500 transition-colors text-sm" 
          onClick={() => confirm("로그아웃 하시겠습니까?") && logout()}
        >
          로그아웃
        </button>
        <button 
          className="text-gray-300 text-xs hover:text-red-400 transition-colors" 
          onClick={() => confirm("정말 탈퇴하시겠습니까? 데이터가 모두 삭제됩니다.") && withdrawMutation.mutate()}
          disabled={withdrawMutation.isPending}
        >
          {withdrawMutation.isPending ? "처리 중..." : "회원 탈퇴하기"}
        </button>
      </div>
    </div>
  );
};

export default MyPage;