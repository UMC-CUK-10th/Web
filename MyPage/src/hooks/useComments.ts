import type { Comment, CommentListResponse } from "../types/Comment";

export async function fetchComments(lpId: number): Promise<CommentListResponse> {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`http://localhost:8000/v1/lps/${lpId}/comments?cursor=0&limit=10&order=asc`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("댓글 조회에 실패했습니다.");

    const json = await res.json();
    return json.data;
}

export async function createComment(lpId: number, content: string): Promise<Comment> {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`http://localhost:8000/v1/lps/${lpId}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("댓글 추가에 실패했습니다.");
  const json = await res.json();
  return json.data;
}

export async function deleteComment(lpId: number, commentId: number) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`http://localhost:8000/v1/lps/${lpId}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("댓글 삭제에 실패하였습니다.");
}

export async function updateComment(lpId: number, commentId: number, content: string) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`http://localhost:8000/v1/lps/${lpId}/comments/${commentId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("댓글 수정에 실패하였습니다.");
  const json = await res.json();
  return json.data;
}