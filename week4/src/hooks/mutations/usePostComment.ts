import { useMutation } from "@tanstack/react-query";
import { postComments } from "../../apis/comment";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostComment(lpId: number) {
  return useMutation({
    mutationFn: (content: string) =>
      postComments({
        lpId,
        content,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, lpId],
      });
    },

    onError: (error) => {
      console.error("댓글 작성 실패 : ", error);
    },
  });
}

export default usePostComment;