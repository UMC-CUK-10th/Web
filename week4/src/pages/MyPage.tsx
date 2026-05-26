import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Camera, Check, Settings, X } from "lucide-react";
import { getMyInfo } from "../apis/auth";
import { QUERY_KEY } from "../constants/key";
import usePatchUsers from "../hooks/mutations/usePatchUsers";
import useImageUpload from "../hooks/mutations/useImageUpload";
import { LoadingSpinner } from "../components/LoadingSpinner";

const MyPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: getMyInfo,
  });

  const { mutate: patchUserMutate, isPending: isPatching } = usePatchUsers();

  const { mutate: uploadImageMutate, isPending: isUploading } = useImageUpload({
    onSuccessCallback: (res) => {
      const imageUrl = res.data?.imageUrl ?? "";
      setAvatar(imageUrl);
      setPreviewImage(imageUrl);
    },
    onErrorCallback: () => {
      alert("프로필 사진 업로드에 실패했습니다.");
    },
  });

  useEffect(() => {
    if (data?.data) {
      setName(data.data.name ?? "");
      setBio(data.data.bio ?? "");
      setAvatar(data.data.avatar ?? "");
      setPreviewImage(data.data.avatar ?? "");
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#fafafa]">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#fafafa] text-red-500">
        내 정보를 불러올 수 없습니다.
      </div>
    );
  }

  const myInfo = data.data;

  const handleCancel = () => {
    setName(myInfo.name ?? "");
    setBio(myInfo.bio ?? "");
    setAvatar(myInfo.avatar ?? "");
    setPreviewImage(myInfo.avatar ?? "");
    setIsEditMode(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    uploadImageMutate(formData);
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }

    patchUserMutate(
      {
        name: name.trim(),
        bio: bio.trim(),
        avatar: avatar || "",
      },
      {
        onSuccess: () => {
          alert("프로필이 수정되었습니다.");
          setIsEditMode(false);
        },
      }
    );
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#fafafa] px-6 py-8 text-gray-800">
      <div className="mx-auto max-w-3xl">
        <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* 상단 헤더 */}
          <div className="mb-8 flex items-center justify-between border-b border-gray-100 pb-5">
            <h3 className="text-xl font-bold text-gray-900">마이페이지</h3>

            {!isEditMode ? (
              <button
                type="button"
                onClick={() => setIsEditMode(true)}
                className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <Settings size={16} />
                설정
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
                >
                  <X size={15} />
                  취소
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isPatching || isUploading}
                  className={`flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                    isPatching || isUploading
                      ? "cursor-not-allowed bg-gray-200 text-gray-400"
                      : "bg-pink-500 text-white hover:bg-pink-600"
                  }`}
                >
                  <Check size={15} />
                  저장
                </button>
              </div>
            )}
          </div>

          {/* 본문 */}
          <div className="flex flex-col items-center">
            <label
              className={`relative mb-6 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-pink-50 ${
                isEditMode ? "cursor-pointer" : ""
              }`}
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="프로필 이미지"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-pink-300">
                  {myInfo.name?.charAt(0).toUpperCase() ?? "?"}
                </span>
              )}

              {isEditMode && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
                    {isUploading ? <LoadingSpinner /> : <Camera size={24} />}
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={isUploading || isPatching}
                  />
                </>
              )}
            </label>

            {isEditMode ? (
              <div className="w-full max-w-xl space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    이름
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                    placeholder="이름을 입력해주세요"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <input
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="h-12 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                    placeholder="소개글을 입력해주세요"
                  />
                  <p className="mt-2 text-xs text-gray-400">
                    Bio는 비어 있어도 저장 가능합니다.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    이메일
                  </label>
                  <div className="flex h-12 items-center rounded-xl bg-gray-50 px-4 text-sm text-gray-500">
                    {myInfo.email}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {myInfo.name}
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {myInfo.bio || "아직 작성된 소개글이 없습니다."}
                </p>

                <p className="mt-4 text-sm font-medium text-gray-700">
                  {myInfo.email}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyPage;