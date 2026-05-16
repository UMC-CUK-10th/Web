import api from "./axios";

// ================= 댓글 생성 =================
export const createComment = async ({
  lpId,
  content,
}: {
  lpId: number;
  content: string;
}) => {
  const response = await api.post(
    `/v1/lps/${lpId}/comments`,
    {
      content,
    }
  );

  return response.data;
};

// ================= 댓글 수정 =================
export const updateComment = async ({
  lpId,
  commentId,
  content,
}: {
  lpId: number;
  commentId: number;
  content: string;
}) => {
  const response = await api.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    {
      content,
    }
  );

  return response.data;
};

// ================= 댓글 삭제 =================
export const deleteComment = async ({
  lpId,
  commentId,
}: {
  lpId: number;
  commentId: number;
}) => {
  const response = await api.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );

  return response.data;
};