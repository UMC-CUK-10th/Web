import { useMemo, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createLP } from "../apis/lp";

interface Props {
  onClose: () => void;
}

const CreateLPModal = ({
  onClose,
}: Props) => {
  const queryClient =
    useQueryClient();

  // 상태
  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [tagInput, setTagInput] =
    useState("");

  const [tags, setTags] =
    useState<string[]>([]);

  const [thumbnail, setThumbnail] =
    useState<File | null>(null);

  // 이미지 미리보기
  const previewImage =
    useMemo(() => {
      if (!thumbnail) return "";

      return URL.createObjectURL(
        thumbnail
      );
    }, [thumbnail]);

  // 태그 추가
  const handleAddTag = () => {
    if (!tagInput.trim())
      return;

    // 중복 방지
    if (
      tags.includes(tagInput)
    ) {
      return;
    }

    setTags([
      ...tags,
      tagInput,
    ]);

    setTagInput("");
  };

  // 태그 삭제
  const handleDeleteTag = (
    deleteTag: string
  ) => {
    setTags(
      tags.filter(
        (tag) =>
          tag !== deleteTag
      )
    );
  };

  // LP 생성 mutation
  const { mutate, isPending } =
    useMutation({
      mutationFn: createLP,

      onSuccess: () => {
        // 목록 새로고침
        queryClient.invalidateQueries(
          {
            queryKey: ["lpList"],
          }
        );

        alert(
          "LP 생성 완료"
        );

        onClose();
      },

      onError: (error) => {
        console.error(error);

        alert(
          "LP 생성 실패"
        );
      },
    });

  // 생성
  const handleSubmit = () => {
    const imageUrl =
      previewImage || "";

    mutate({
      title,
      content,

      thumbnail:
        imageUrl,

      tags,

      published: true,
    });
  };

  return (
    <div
      className="
        fixed inset-0
        bg-black/70
        backdrop-blur-sm
        flex justify-center items-center
        z-50
      "
      onClick={onClose}
    >
      {/* 모달 */}
      <div
        className="
          bg-[#181818]
          w-[450px]
          rounded-2xl
          p-6
          relative
          max-h-[90vh]
          overflow-y-auto
          shadow-2xl
          border border-gray-800
        "
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        {/* 닫기 */}
        <button
          onClick={onClose}
          className="
            absolute
            top-4
            right-4
            text-white
            text-xl
          "
        >
          ✕
        </button>

        {/* 제목 */}
        <h2
          className="
            text-2xl
            font-bold
            text-white
            mb-6
          "
        >
          Add LP
        </h2>

        {/* 이미지 업로드 */}
        <div className="mb-6">
          <label
            htmlFor="lp-image"
            className="block cursor-pointer"
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="preview"
                className="
                  w-full
                  aspect-square
                  object-cover
                  rounded-2xl
                  border border-gray-700
                "
              />
            ) : (
              <div
                className="
                  w-full
                  aspect-square
                  rounded-2xl
                  border-2
                  border-dashed
                  border-gray-700
                  bg-[#111]
                  flex flex-col
                  justify-center
                  items-center
                  gap-3
                  hover:border-pink-500
                  transition
                "
              >
                {/* LP 모양 */}
                <div
                  className="
                    relative
                    w-44
                    h-44
                    rounded-full
                    bg-gradient-to-br
                    from-gray-700
                    to-black
                    flex
                    justify-center
                    items-center
                  "
                >
                  <div
                    className="
                      w-16
                      h-16
                      rounded-full
                      bg-gray-400
                      border-4
                      border-gray-800
                    "
                  />
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-gray-400
                  "
                >
                  <span className="text-2xl">
                    🎵
                  </span>

                  <p>
                    LP 사진 추가하기
                  </p>
                </div>
              </div>
            )}
          </label>

          <input
            id="lp-image"
            type="file"
            accept="image/*"
            onChange={(e) =>
              setThumbnail(
                e.target
                  .files?.[0] ||
                  null
              )
            }
            className="hidden"
          />
        </div>

        {/* LP 이름 */}
        <div className="mb-4">
          <label
            className="
              text-white
              block
              mb-2
              font-medium
            "
          >
            LP Name
          </label>

          <input
            type="text"
            placeholder="LP 이름 입력"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="
              w-full
              px-4
              py-3
              rounded-xl
              bg-[#111]
              text-white
              border border-gray-700
            "
          />
        </div>

        {/* 내용 */}
        <div className="mb-4">
          <label
            className="
              text-white
              block
              mb-2
              font-medium
            "
          >
            LP Content
          </label>

          <textarea
            placeholder="LP 설명 입력"
            value={content}
            onChange={(e) =>
              setContent(
                e.target.value
              )
            }
            className="
              w-full
              h-32
              px-4
              py-3
              rounded-xl
              bg-[#111]
              text-white
              border border-gray-700
              resize-none
            "
          />
        </div>

        {/* 태그 */}
        <div className="mb-6">
          <label
            className="
              text-white
              block
              mb-2
              font-medium
            "
          >
            LP Tags
          </label>

          {/* 태그 입력 */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="#jazz"
              value={tagInput}
              onChange={(e) =>
                setTagInput(
                  e.target.value
                )
              }
              className="
                flex-1
                px-4
                py-3
                rounded-xl
                bg-[#111]
                text-white
                border border-gray-700
              "
            />

            <button
              onClick={
                handleAddTag
              }
              className="
                px-4
                rounded-xl
                bg-pink-500
                hover:bg-pink-600
                transition
                font-bold
              "
            >
              +
            </button>
          </div>

          {/* 태그 목록 */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-full
                  bg-pink-500/20
                  border
                  border-pink-500
                  text-sm
                "
              >
                <span>
                  #{tag}
                </span>

                <button
                  onClick={() =>
                    handleDeleteTag(
                      tag
                    )
                  }
                  className="
                    text-red-400
                    hover:text-red-300
                  "
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 생성 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="
            w-full
            py-4
            rounded-xl
            bg-pink-500
            hover:bg-pink-600
            transition
            text-white
            font-bold
            text-lg
            disabled:opacity-50
          "
        >
          {isPending
            ? "생성중..."
            : "Add LP"}
        </button>
      </div>
    </div>
  );
};

export default CreateLPModal;