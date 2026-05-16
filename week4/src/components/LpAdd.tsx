import { useEffect, useState } from "react";
import useLpAdd from "../hooks/mutations/useLpAdd";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateLpsDto } from "../types/lp";
import useImageUpload from "../hooks/mutations/useImageUpload";
import { LoadingSpinner } from "./LoadingSpinner";
import { Modal } from "./Modal";
import { ImagePlus, Plus, X } from "lucide-react";

interface LpAddProps {
  isOpen: boolean;
  onClose: () => void;
}

type LpAddFormValues = {
  lptitle: string;
  lpcontent: string;
};

const LpAdd = ({ isOpen, onClose }: LpAddProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LpAddFormValues>({
    defaultValues: {
      lptitle: "",
      lpcontent: "",
    },
  });

  const { mutate: uploadImage, isPending: isUploading } = useImageUpload({
    onSuccessCallback: (res) => {
      const url = res.data?.imageUrl ?? null;
      setThumbnailUrl(url);
    },
    onErrorCallback: (error) => {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다.");
      setSelectedFile(null);
      setImagePreview(null);
      setThumbnailUrl(null);
    },
  });

  const { mutate: addLpMutate, isPending: isAdding } = useLpAdd({
    onSuccessCallback: () => {
      reset();
      setTags([]);
      setInputTag("");
      setSelectedFile(null);
      setImagePreview(null);
      setThumbnailUrl(null);
      onClose();
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
      setTags([]);
      setInputTag("");
      setSelectedFile(null);
      setImagePreview(null);
      setThumbnailUrl(null);
    }
  }, [isOpen, reset]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setThumbnailUrl(null);

    const formData = new FormData();
    formData.append("file", file);
    uploadImage(formData);
  };

  const handleAddTag = () => {
    const trimmedTag = inputTag.trim();

    if (!trimmedTag) return;

    if (tags.includes(trimmedTag)) {
      setInputTag("");
      return;
    }

    setTags((prev) => [...prev, trimmedTag]);
    setInputTag("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const onSubmit: SubmitHandler<LpAddFormValues> = (data) => {
    if (isUploading) {
      alert("이미지가 아직 업로드 중입니다.");
      return;
    }

    if (!selectedFile || !thumbnailUrl) {
      alert("LP 사진을 업로드해주세요.");
      return;
    }

    const payload: CreateLpsDto = {
      title: data.lptitle,
      content: data.lpcontent,
      tags,
      published: true,
      thumbnail: thumbnailUrl,
    };

    addLpMutate(payload);
  };

  const isSubmitDisabled = isUploading || isAdding;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="LP 작성">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col items-center">
          <label className="group flex h-36 w-36 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border border-gray-200 bg-[#fafafa] transition hover:border-pink-300 hover:bg-pink-50">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={isUploading || isAdding}
            />

            {isUploading ? (
              <LoadingSpinner />
            ) : imagePreview ? (
              <img
                src={imagePreview}
                alt="LP 미리보기"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-pink-500">
                <ImagePlus size={30} />
                <span className="text-xs font-medium">LP 사진 선택</span>
              </div>
            )}
          </label>

          {selectedFile && (
            <p className="mt-2 max-w-[220px] truncate text-xs text-gray-400">
              {selectedFile.name}
            </p>
          )}
        </div>

        <div>
          <input
            className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100 ${
              errors.lptitle ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="LP 제목을 입력해주세요"
            {...register("lptitle", {
              required: "LP 제목을 입력해주세요.",
            })}
          />

          {errors.lptitle && (
            <p className="mt-2 text-xs text-red-500">
              {errors.lptitle.message}
            </p>
          )}
        </div>

        <div>
          <textarea
            className={`min-h-28 w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100 ${
              errors.lpcontent ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="LP 내용을 입력해주세요"
            {...register("lpcontent", {
              required: "LP 내용을 입력해주세요.",
            })}
          />

          {errors.lpcontent && (
            <p className="mt-2 text-xs text-red-500">
              {errors.lpcontent.message}
            </p>
          )}
        </div>

        <div>
          <div className="flex gap-2">
            <input
              className="h-11 flex-1 rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              placeholder="태그를 입력해주세요"
              value={inputTag}
              onChange={(e) => setInputTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              disabled={isAdding}
            />

            <button
              type="button"
              onClick={handleAddTag}
              className="flex h-11 items-center gap-1 rounded-xl bg-pink-500 px-4 text-sm font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
              disabled={!inputTag.trim() || isAdding}
            >
              <Plus size={16} />
              추가
            </button>
          </div>

          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-pink-50 px-3 py-1 text-sm font-medium text-pink-500"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="rounded-full p-0.5 transition hover:bg-pink-100"
                    aria-label={`${tag} 태그 삭제`}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`mt-2 h-12 w-full rounded-xl text-sm font-semibold transition ${
            isSubmitDisabled
              ? "cursor-not-allowed bg-gray-200 text-gray-400"
              : "bg-pink-500 text-white hover:bg-pink-600"
          }`}
        >
          {isUploading
            ? "이미지 업로드 중..."
            : isAdding
              ? "LP 추가 중..."
              : "Add LP"}
        </button>
      </form>
    </Modal>
  );
};

export default LpAdd;