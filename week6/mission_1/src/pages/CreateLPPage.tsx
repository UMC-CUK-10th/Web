import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { createLP } from "../apis/lp";

const CreateLPPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [thumbnail, setThumbnail] =
    useState("");

  const handleSubmit =
    async () => {
      try {
        await createLP({
          title,
          content,
          thumbnail,

          tags: ["music"],

          published: true,
        });

        alert("LP 생성 완료");

        navigate("/");
      } catch (error) {
        console.error(error);

        alert("생성 실패");
      }
    };

  return (
    <div
      className="
        max-w-[600px]
        mx-auto
        text-white
      "
    >
      <h1
        className="
          text-4xl
          font-bold
          mb-8
        "
      >
        LP 생성
      </h1>

      <div className="space-y-5">
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          className="
            w-full
            p-4
            rounded-md
            bg-[#222]
          "
        />

        <input
          type="text"
          placeholder="썸네일 URL"
          value={thumbnail}
          onChange={(e) =>
            setThumbnail(
              e.target.value
            )
          }
          className="
            w-full
            p-4
            rounded-md
            bg-[#222]
          "
        />

        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) =>
            setContent(
              e.target.value
            )
          }
          rows={8}
          className="
            w-full
            p-4
            rounded-md
            bg-[#222]
          "
        />

        <button
          onClick={handleSubmit}
          className="
            w-full
            p-4
            bg-pink-500
            rounded-md
            font-bold
          "
        >
          생성하기
        </button>
      </div>
    </div>
  );
};

export default CreateLPPage;