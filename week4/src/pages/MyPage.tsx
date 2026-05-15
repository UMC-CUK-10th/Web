import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState, type ChangeEvent } from "react";
import { getMyInfo, patchMyInfo, uploadProfileImage } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { type ResponseMyInfoDto } from "../types/auth";

const USER_NAME_UPDATED_EVENT = "user-name-updated";

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [submitError, setSubmitError] = useState("");
  const { setItem: setUserName } = useLocalStorage(LOCAL_STORAGE_KEY.userName);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      setData(response);
    };

    getData();
  }, []);

  useEffect(() => {
    if (!data?.data) {
      return;
    }

    setName(data.data.name);
    setBio(data.data.bio ?? "");
    setAvatarPreview(data.data.avatar ?? "");
    setAvatarFile(null);
  }, [data]);

  const updateProfileMutation = useMutation({
    mutationFn: patchMyInfo,
    onMutate: async (nextProfile) => {
      const previousData = data;
      const previousUserName = data?.data.name ?? "";

      if (previousData?.data) {
        const optimisticData: ResponseMyInfoDto = {
          ...previousData,
          data: {
            ...previousData.data,
            name: nextProfile.name ?? previousData.data.name,
            bio:
              nextProfile.bio === undefined
                ? previousData.data.bio
                : nextProfile.bio ?? null,
            avatar:
              nextProfile.avatar === undefined
                ? previousData.data.avatar
                : nextProfile.avatar ?? null,
          },
        };

        setData(optimisticData);
      }

      if (nextProfile.name) {
        setUserName(nextProfile.name);
        window.dispatchEvent(
          new CustomEvent(USER_NAME_UPDATED_EVENT, {
            detail: { name: nextProfile.name },
          })
        );
      }

      return { previousData, previousUserName };
    },
    onSuccess: (response) => {
      setData(response);
      setUserName(response.data.name);
      window.dispatchEvent(
        new CustomEvent(USER_NAME_UPDATED_EVENT, {
          detail: { name: response.data.name },
        })
      );
      setIsSettingOpen(false);
      setSubmitError("");
    },
    onError: (error, _variables, context) => {
      if (context?.previousData) {
        setData(context.previousData);
      }

      setUserName(context?.previousUserName ?? "");
      window.dispatchEvent(
        new CustomEvent(USER_NAME_UPDATED_EVENT, {
          detail: { name: context?.previousUserName ?? "" },
        })
      );

      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ??
          error.response?.data?.error ??
          "프로필 수정에 실패했습니다.";
        setSubmitError(Array.isArray(message) ? message.join(", ") : String(message));
        return;
      }

      setSubmitError("프로필 수정에 실패했습니다.");
    },
  });

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setAvatarFile(file);

    if (!file) {
      setAvatarPreview(data?.data.avatar ?? "");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
  };

  return (
    <section className="w-full">
      <div className="rounded-[32px] bg-white/75 p-8 shadow-xl ring-1 ring-rose-200 backdrop-blur">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={
                data?.data.avatar ||
                "https://placehold.co/160x160/FDE7EF/9F1239?text=USER"
              }
              alt="프로필 이미지"
              className="h-24 w-24 rounded-full border border-rose-200 bg-white object-cover"
            />
            <div>
              <h1 className="text-2xl font-black text-rose-950">마이페이지</h1>
              <p className="mt-2 text-lg font-semibold text-rose-900">
                {data?.data.name ?? "회원 정보를 불러오는 중입니다."}
              </p>
              <p className="mt-1 text-sm text-rose-900/60">
                {data?.data.email ?? ""}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsSettingOpen((prev) => !prev);
              setSubmitError("");
            }}
            className="rounded-2xl border border-rose-200 bg-white px-4 py-3 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-50"
          >
            수정
          </button>
        </div>

        <div className="mt-6 rounded-3xl bg-rose-50/80 p-5 ring-1 ring-rose-100">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-rose-400">
            자기소개
          </p>
          <p className="mt-3 whitespace-pre-wrap text-base leading-7 text-rose-900/75">
            {data?.data.bio?.trim() || "아직 작성된 소개가 없습니다."}
          </p>
        </div>

        {isSettingOpen && (
          <form
            className="mt-6 space-y-5 rounded-3xl border border-rose-200 bg-white p-6 shadow-sm"
            onSubmit={async (event) => {
              event.preventDefault();
              setSubmitError("");

              try {
                const uploadedAvatarUrl = avatarFile
                  ? await uploadProfileImage(avatarFile)
                  : avatarPreview || undefined;

                await updateProfileMutation.mutateAsync({
                  name: name.trim(),
                  bio: bio.trim() || undefined,
                  avatar: uploadedAvatarUrl || undefined,
                });
              } catch (error) {
                if (axios.isAxiosError(error)) {
                  const message =
                    error.response?.data?.message ??
                    error.response?.data?.error ??
                    "프로필 수정에 실패했습니다.";
                  setSubmitError(
                    Array.isArray(message) ? message.join(", ") : String(message)
                  );
                  return;
                }

                setSubmitError("프로필 수정에 실패했습니다.");
              }
            }}
          >
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-rose-400">
                Settings
              </p>
              <h2 className="mt-2 text-2xl font-black text-rose-950">프로필 수정</h2>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-rose-900">
                프로필 사진
              </span>
              <div className="rounded-2xl border border-dashed border-rose-300 bg-rose-50/70 p-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="block w-full cursor-pointer text-sm text-rose-900 file:mr-4 file:cursor-pointer file:rounded-xl file:border-0 file:bg-rose-500 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-rose-600"
                />
                {avatarPreview && (
                  <img
                    src={avatarPreview}
                    alt="프로필 미리보기"
                    className="mt-4 h-40 w-40 rounded-full border border-rose-200 object-cover"
                  />
                )}
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-rose-900">
                이름
              </span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-2xl border border-rose-200 bg-rose-50/70 px-4 py-3 text-rose-950 focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-rose-900">
                Bio
              </span>
              <textarea
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                rows={4}
                placeholder="자기소개를 입력해주세요"
                className="w-full resize-none rounded-2xl border border-rose-200 bg-rose-50/70 px-4 py-3 text-rose-950 placeholder:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </label>

            {submitError && <p className="text-sm text-red-500">{submitError}</p>}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsSettingOpen(false);
                  setSubmitError("");
                  setName(data?.data.name ?? "");
                  setBio(data?.data.bio ?? "");
                  setAvatarPreview(data?.data.avatar ?? "");
                  setAvatarFile(null);
                }}
                className="rounded-2xl border border-rose-200 px-5 py-3 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-50"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={name.trim().length === 0 || updateProfileMutation.isPending}
                className="rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {updateProfileMutation.isPending ? "저장 중..." : "저장"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default MyPage;
