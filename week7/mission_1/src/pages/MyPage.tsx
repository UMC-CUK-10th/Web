import { useState } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { updateProfile, deleteAccount } from "../apis/user";

const MyPage = () => {
  const { user, setUser } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // ================= 상태 =================
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");

  // ================= 프로필 수정 =================
  const { mutate: updateProfileMutate } = useMutation({
    mutationFn: updateProfile,

    onSuccess: (data) => {
      setUser(data.data);
      queryClient.invalidateQueries();
      setIsEditOpen(false);
      alert("프로필 수정 완료");
    },

    onError: () => {
      alert("프로필 수정 실패");
    },
  });

  // ================= 회원탈퇴 =================
  const { mutate: deleteAccountMutate, isPending } = useMutation({
    mutationFn: deleteAccount,

    onSuccess: () => {
      localStorage.removeItem("accessToken");
      setUser(null);
      queryClient.clear();

      setIsDeleteOpen(false);

      navigate("/login");
    },

    onError: () => {
      alert("회원탈퇴 실패");
    },
  });

  // ================= UI =================
  return (
    <div className="text-white">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">마이페이지</h1>

        <div className="flex gap-3">
          <button
            onClick={() => setIsEditOpen(true)}
            className="px-5 py-2 bg-pink-500 rounded-lg"
          >
            설정
          </button>

          <button
            onClick={() => setIsDeleteOpen(true)}
            className="px-5 py-2 bg-red-500 rounded-lg"
          >
            회원탈퇴
          </button>
        </div>
      </div>

      {/* 프로필 */}
      <div className="bg-[#181818] border border-gray-800 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-pink-500">
          <img
            src={user?.avatar || "https://i.pravatar.cc/300"}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-3">{user?.name}님 👋</h2>
          <p className="text-gray-400 mb-2">{user?.email}</p>
          <p className="text-gray-300">
            {user?.bio || "아직 소개글이 없습니다."}
          </p>
        </div>
      </div>

      {/* ================= 수정 모달 ================= */}
      {isEditOpen && (
        <div
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
          onClick={() => setIsEditOpen(false)}
        >
          <div
            className="bg-[#181818] w-[450px] rounded-2xl p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6">프로필 수정</h2>

            <input
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full p-3 mb-4 bg-[#111] rounded"
              placeholder="avatar url"
            />

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mb-4 bg-[#111] rounded"
              placeholder="name"
            />

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 mb-4 bg-[#111] rounded h-28"
              placeholder="bio"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setIsEditOpen(false)}
                className="flex-1 py-2 bg-gray-700 rounded"
              >
                취소
              </button>

              <button
                onClick={() =>
                  updateProfileMutate({ name, bio, avatar })
                }
                className="flex-1 py-2 bg-pink-500 rounded"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 탈퇴 확인 모달 ================= */}
      {isDeleteOpen && (
        <div
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
          onClick={() => setIsDeleteOpen(false)}
        >
          <div
            className="bg-[#181818] p-6 rounded-xl w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">
              정말 탈퇴하시겠습니까?
            </h2>

            <p className="text-gray-400 mb-6">
              탈퇴 시 모든 데이터가 삭제됩니다.
            </p>

            <div className="flex gap-3">
              {/* ❗ 아니오 */}
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="flex-1 py-2 bg-gray-700 rounded"
              >
                아니오
              </button>

              {/* ❗ 예 (여기서만 mutation 실행) */}
              <button
                onClick={() => deleteAccountMutate()}
                disabled={isPending}
                className="flex-1 py-2 bg-red-500 rounded"
              >
                {isPending ? "탈퇴중..." : "예"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;