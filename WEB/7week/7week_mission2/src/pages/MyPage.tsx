import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useUpdateProfile } from "../hooks/mutations/useUpdateProfile";

const MyPage = () => {
  const navigate = useNavigate();
  const { data: myInfo, isLoading } = useGetMyInfo();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [editNickname, setEditNickname] = useState(""); // nickname으로 통일
  const [editBio, setEditBio] = useState("");

  // 정보 불러오기 및 수정 모드 진입 시 초기값 설정
  useEffect(() => {
    if (myInfo?.data) {
      setEditNickname(myInfo.data.nickname || myInfo.data.name || "");
      setEditBio(myInfo.data.bio || "");
    }
  }, [myInfo, isEditing]);

  if (isLoading) return (
    <div className="flex min-h-[calc(100dvh-72px)] items-center justify-center bg-[#000d1a]">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-900/30 border-t-blue-500" />
    </div>
  );

  const handleUpdateProfile = () => {
    if (!editNickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    // 낙관적 업데이트가 적용된 mutate 호출
    updateProfile(
      { nickname: editNickname, bio: editBio },
      {
        onSuccess: () => {
          setIsEditing(false);
          // alert을 빼면 훨씬 부드러운 UX가 됩니다 (영상처럼 즉시 반영되니까요!)
        },
      }
    );
  };

  return (
    <main className="min-h-[calc(100dvh-72px)] bg-gradient-to-b from-[#000d1a] via-[#001a2c] to-[#002a45] px-6">
      <div className="mx-auto flex min-h-[calc(100dvh-72px)] w-full max-w-screen-xl items-center justify-center">
        <div className="w-full max-w-[420px]">
          {/* 헤더 영역 */}
          <div className="relative mb-12 flex items-center justify-center">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-blue-900/20 text-white transition-all hover:bg-blue-900/40"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <h1 className="text-[18px] font-black tracking-[0.2em] text-white uppercase">Profile</h1>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute right-0 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
              >
                EDIT
              </button>
            )}
          </div>

          {isEditing ? (
            /* --- 수정 모드 UI (낙관적 업데이트의 부드러움 강조) --- */
            <div className="flex flex-col gap-6 rounded-[32px] border border-blue-900/30 bg-[#001a2c]/60 p-10 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col items-center gap-4">
                <div className="group relative h-28 w-28 cursor-pointer overflow-hidden rounded-full border-2 border-dashed border-blue-900/50 bg-[#000d1a] transition-all hover:border-blue-500">
                  <div className="flex h-full w-full items-center justify-center text-[10px] font-bold text-blue-900 group-hover:text-blue-400">
                    CHANGE
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    value={editNickname}
                    onChange={(e) => setEditNickname(e.target.value)}
                    placeholder="Nickname"
                    className="flex-1 rounded-2xl border border-blue-900/30 bg-[#000d1a] px-6 py-4 text-sm text-white placeholder:text-blue-950 outline-none focus:border-blue-500 transition-all"
                  />
                </div>

                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Tell your story..."
                  className="h-32 w-full rounded-2xl border border-blue-900/30 bg-[#000d1a] px-6 py-4 text-sm text-white placeholder:text-blue-950 outline-none focus:border-blue-500 transition-all resize-none"
                />
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <button
                  onClick={handleUpdateProfile}
                  disabled={isPending}
                  className="w-full rounded-2xl bg-blue-600 py-4 text-sm font-black tracking-widest text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 disabled:bg-blue-900/50"
                >
                  {isPending ? "SAVING..." : "SAVE CHANGES"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-xs font-bold text-blue-900 hover:text-blue-400 transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </div>
          ) : (
            /* --- 조회 모드 UI (시각적 갬성 극대화) --- */
            <div className="flex flex-col items-center gap-8 py-4">
              <div className="relative">
                <div className="absolute -inset-1 animate-pulse rounded-full bg-blue-500/20 blur-2xl" />
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-blue-500/30 bg-[#000d1a] shadow-2xl">
                  <span className="text-[40px] font-black text-white">
                    {(myInfo?.data?.nickname || myInfo?.data?.name || "U")[0].toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-[32px] font-black tracking-tight text-white">
                  {myInfo?.data?.nickname || myInfo?.data?.name}
                </h2>
                <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-blue-600/50" />
                <p className="mt-6 max-w-[300px] text-[15px] leading-relaxed text-blue-100/60 whitespace-pre-wrap font-medium">
                  {myInfo?.data?.bio || "음악과 LP를 사랑하는 꿀범코드 회원입니다."}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-full border border-blue-900/30 bg-blue-950/20 px-6 py-2 text-[12px] font-bold tracking-widest text-blue-400/80 uppercase">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                {myInfo?.data?.email}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MyPage;