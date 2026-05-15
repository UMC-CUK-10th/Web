import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState, type ChangeEvent } from "react";
import { createLp, updateLp, uploadLpImage } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";
import type { LpDetail } from "../types/lp";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
  lpid?: string;
  initialData?: LpDetail | null;
}

const LpCreateModal = ({
  isOpen,
  onClose,
  mode = "create",
  lpid,
  initialData = null,
}: Props) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [submitError, setSubmitError] = useState("");

  const isEditMode = mode === "edit";

  const invalidateLpQueries = async () => {
    await queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.lps],
    });
    if (lpid) {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, lpid],
      });
    }
  };

  const createLpMutation = useMutation({
    mutationFn: createLp,
    onSuccess: async () => {
      await invalidateLpQueries();
      onClose();
    },
    onError: () => {
      setSubmitError("LP 생성에 실패했습니다. 입력값을 확인한 뒤 다시 시도해주세요.");
    },
  });

  const updateLpMutation = useMutation({
    mutationFn: updateLp,
    onSuccess: async () => {
      await invalidateLpQueries();
      onClose();
    },
    onError: () => {
      setSubmitError("LP 수정에 실패했습니다. 입력값을 확인한 뒤 다시 시도해주세요.");
    },
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setContent("");
      setTagInput("");
      setTags([]);
      setImageFile(null);
      setPreviewUrl("");
      setSubmitError("");
      return;
    }

    if (isEditMode && initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setTags(initialData.tags.map((tag) => tag.name));
      setPreviewUrl(initialData.thumbnail ?? "");
      setImageFile(null);
      setTagInput("");
      setSubmitError("");
      return;
    }

    setTitle("");
    setContent("");
    setTagInput("");
    setTags([]);
    setImageFile(null);
    setPreviewUrl("");
    setSubmitError("");
  }, [initialData, isEditMode, isOpen]);

  const handleAddTag = () => {
    const nextTag = tagInput.trim();

    if (!nextTag) {
      return;
    }

    if (tags.includes(nextTag)) {
      setTagInput("");
      return;
    }

    setTags((prev) => [...prev, nextTag]);
    setTagInput("");
  };

  const handleRemoveTag = (targetTag: string) => {
    setTags((prev) => prev.filter((tag) => tag !== targetTag));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setImageFile(file);
    setSubmitError("");

    if (!file) {
      setPreviewUrl(isEditMode ? initialData?.thumbnail ?? "" : "");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const isPending = createLpMutation.isPending || updateLpMutation.isPending;
  const isInvalid =
    title.trim().length === 0 || content.trim().length === 0 || tags.length === 0 || isPending;

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-rose-950/45 px-4 py-8 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lp-create-modal-title"
        className="relative w-full max-w-2xl rounded-[28px] bg-white p-6 shadow-2xl ring-1 ring-rose-100 sm:p-8"
      >
        <button
          type="button"
          aria-label="모달 닫기"
          onClick={onClose}
          className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-xl font-semibold text-rose-500 transition-colors hover:bg-rose-100 hover:text-rose-700"
        >
          X
        </button>

        <div className="pr-12">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-rose-400">
            {isEditMode ? "Edit LP" : "New LP"}
          </p>
          <h2
            id="lp-create-modal-title"
            className="mt-3 text-3xl font-black text-rose-950"
          >
            {isEditMode ? "LP 수정" : "LP 글 작성"}
          </h2>
        </div>

        <form
          className="mt-8 space-y-5"
          onSubmit={async (event) => {
            event.preventDefault();
            setSubmitError("");

            try {
              const thumbnail = imageFile
                ? await uploadLpImage(imageFile)
                : previewUrl || undefined;

              if (isEditMode && lpid) {
                await updateLpMutation.mutateAsync({
                  lpid,
                  title: title.trim(),
                  content: content.trim(),
                  thumbnail,
                  tags,
                  published: true,
                });
                return;
              }

              await createLpMutation.mutateAsync({
                title: title.trim(),
                content: content.trim(),
                thumbnail,
                tags,
                published: true,
              });
            } catch (error) {
              if (axios.isAxiosError(error)) {
                const message =
                  error.response?.data?.message ??
                  error.response?.data?.error ??
                  `LP ${isEditMode ? "수정" : "생성"}에 실패했습니다.`;
                setSubmitError(
                  Array.isArray(message) ? message.join(", ") : String(message)
                );
                return;
              }

              setSubmitError(`LP ${isEditMode ? "수정" : "생성"}에 실패했습니다.`);
            }
          }}
        >
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-rose-900">사진</span>
            <div className="rounded-2xl border border-dashed border-rose-300 bg-rose-50/70 p-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full cursor-pointer text-sm text-rose-900 file:mr-4 file:cursor-pointer file:rounded-xl file:border-0 file:bg-rose-500 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-rose-600"
              />
              <p className="mt-2 text-sm text-rose-600">
                {imageFile
                  ? `선택된 파일: ${imageFile.name}`
                  : "jpg, png 등 이미지 파일을 선택해주세요."}
              </p>
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="선택한 LP 미리보기"
                  className="mt-4 h-52 w-full rounded-2xl object-cover ring-1 ring-rose-200"
                />
              )}
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-rose-900">제목</span>
            <input
              type="text"
              placeholder="LP 제목을 입력해주세요"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-2xl border border-rose-200 bg-rose-50/70 px-4 py-3 text-rose-950 placeholder:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-rose-900">내용</span>
            <textarea
              placeholder="LP와 관련된 감상이나 소개를 작성해주세요"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={6}
              className="w-full resize-none rounded-2xl border border-rose-200 bg-rose-50/70 px-4 py-3 text-rose-950 placeholder:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          </label>

          <div className="block">
            <span className="mb-2 block text-sm font-semibold text-rose-900">태그</span>
            <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4">
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="text"
                  placeholder="태그를 입력해주세요"
                  value={tagInput}
                  onChange={(event) => setTagInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className="flex-1 rounded-2xl border border-rose-200 bg-white px-4 py-3 text-rose-950 placeholder:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="rounded-2xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-600"
                >
                  태그 추가
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-rose-700 ring-1 ring-rose-200"
                  >
                    #{tag}
                    <button
                      type="button"
                      aria-label={`${tag} 태그 삭제`}
                      onClick={() => handleRemoveTag(tag)}
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-xs text-rose-600 transition-colors hover:bg-rose-200"
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>

              {tags.length === 0 && (
                <p className="mt-3 text-sm text-rose-500">태그를 1개 이상 추가해주세요.</p>
              )}
            </div>
          </div>

          {submitError && <p className="text-sm text-red-500">{submitError}</p>}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-rose-200 px-5 py-3 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isInvalid}
              className="rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? (isEditMode ? "수정 중..." : "등록 중...") : isEditMode ? "수정" : "Add LP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LpCreateModal;
