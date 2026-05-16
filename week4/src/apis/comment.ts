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

export const patchComment = async (
  body: RequestPatchCommentDto
): Promise<ResponseCommentDto> => {
  const { commentId, content } = body;

  const { data } = await axiosInstance.patch(`/v1/comments/${commentId}`, {
    content,
  });

  return data;
};

export const deleteComment = async (
  commentId: number
): Promise<ResponseDeleteCommentDto> => {
  const { data } = await axiosInstance.delete(`/v1/comments/${commentId}`);

  return data;
};

// 기존 코드들이 복수형 이름으로 import하고 있어서 alias 추가
export const postComments = postComment;
export const patchComments = patchComment;
export const deleteComments = deleteComment;