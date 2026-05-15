import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { createLpComment } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";

interface Props {
  lpid: string;
}

const LpCommentForm = ({ lpid }: Props) => {
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [submitError, setSubmitError] = useState("");
  const isInvalid = content.trim().length === 0;

  const createCommentMutation = useMutation({
    mutationFn: createLpComment,
    onSuccess: async () => {
      setContent("");
      setSubmitError("");
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, lpid],
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ??
          error.response?.data?.error ??
          "댓글 작성에 실패했습니다.";
        setSubmitError(Array.isArray(message) ? message.join(", ") : String(message));
        return;
      }

      setSubmitError("댓글 작성에 실패했습니다.");
    },
  });

  return (
    <form
      className="mb-6"
      onSubmit={async (event) => {
        event.preventDefault();
        setSubmitError("");

        try {
          await createCommentMutation.mutateAsync({
            lpid,
            content: content.trim(),
          });
        } catch {
          return;
        }
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
          disabled={isInvalid || createCommentMutation.isPending}
          className="cursor-pointer rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {createCommentMutation.isPending ? "작성 중..." : "작성"}
        </button>
      </div>
      <p className="mt-2 text-sm text-rose-500">
        {isInvalid ? "댓글은 1자 이상 입력해주세요." : "댓글을 바로 등록할 수 있습니다."}
      </p>
      {submitError && <p className="mt-2 text-sm text-red-500">{submitError}</p>}
    </form>
  );
};

export default LpCommentForm;
