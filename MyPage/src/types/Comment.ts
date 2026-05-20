import type { Author } from "./Lp";

export interface Comment {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

export interface CommentListResponse {
  data: Comment[];
  nextCursor: number;
  hasNext: boolean;
}