import { axiosInstance } from "./axios";
import type {
  RequestCommentDto,
  RequestPatchCommentDto,
  ResponseCommentDto,
  ResponseDeleteCommentDto,
} from "../types/comment";

export const postComment = async (
  body: RequestCommentDto
): Promise<ResponseCommentDto> => {
  const { lpId, content } = body;

  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
    content,
  });

  return data;
};

export const patchComment = async ({
  lpId,
  commentId,
  content,
}: RequestPatchCommentDto & { lpId: number }): Promise<ResponseCommentDto> => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    {
      content,
    }
  );

  return data;
};

export const deleteComment = async ({
  lpId,
  commentId,
}: {
  lpId: number;
  commentId: number;
}): Promise<ResponseDeleteCommentDto> => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );

  return data;
};

export const postComments = postComment;
export const patchComments = patchComment;
export const deleteComments = deleteComment;