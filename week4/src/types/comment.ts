import type { CommonResponse } from "./common";

export type CommentAuthor = {
  id: number;
  name: string;
  email?: string;
  avatar?: string | null;
};

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: CommentAuthor;
};

export type CommentItem = Comment;

export type RequestCommentDto = {
  lpId: number;
  content: string;
};

export type RequestPatchCommentDto = {
  commentId: number;
  content: string;
};

export type ResponseCommentDto = CommonResponse<Comment>;

export type ResponseCommentListDto = CommonResponse<{
  data: Comment[];
  nextCursor: number | null;
  hasNext: boolean;
}>;

export type ResponseDeleteCommentDto = CommonResponse<{
  id: number;
}>;