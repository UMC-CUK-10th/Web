// api/like.ts
import type { Like } from "../types/Lp";

export async function addLike(lpId: number): Promise<void> {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`http://localhost:8000/v1/lps/${lpId}/likes`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("좋아요에 실패했습니다.");
}

export async function deleteLike(lpId: number): Promise<void> {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`http://localhost:8000/v1/lps/${lpId}/likes`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("좋아요 취소에 실패했습니다.");
}