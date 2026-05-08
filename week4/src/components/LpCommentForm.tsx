import { useState } from "react";

const LpCommentForm = () => {
  const [content, setContent] = useState("");
  const isInvalid = content.trim().length === 0;

  return (
    <form
      className="mb-6"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          placeholder="댓글을 남겨주세요"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="flex-1 rounded-xl border border-rose-200 bg-white px-4 py-3 text-rose-950 placeholder:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300"
        />
        <button
          type="submit"
          disabled={isInvalid}
          className="cursor-pointer rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          작성
        </button>
      </div>
      <p className="mt-2 text-sm text-rose-500">
        {isInvalid
          ? "댓글은 1자 이상 입력해주세요."
          : "댓글 작성 기능은 UI만 구현되어 있습니다."}
      </p>
    </form>
  );
};

export default LpCommentForm;
