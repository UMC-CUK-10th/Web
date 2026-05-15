import type { User } from "../types/User";
import { useQuery } from "@tanstack/react-query";
import type { UpdateUserRequest } from "../types/User";

async function fetchUser(): Promise<User> {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("토큰이 없습니다.");

  const res = await fetch("http://localhost:8000/v1/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("유저 정보를 불러오지 못했습니다.");
  const json = await res.json();
  return json.data;
}

export function useUser() {
  const { data: user, isLoading: loading } = useQuery({
    queryKey: ["user"], // ← 이 key로 invalidateQueries가 찾아서 갱신
    queryFn: fetchUser,
    retry: false, // 토큰 없을 때 불필요한 재시도 방지
  });

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  async function updateUser(data: UpdateUserRequest): Promise<User> {
    const token = localStorage.getItem("accessToken");
    const res = await fetch("http://localhost:8000/v1/users", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("프로필 수정에 실패했습니다.");
    const json = await res.json();
    return json.data;
  }

  return { user: user ?? null, loading, logout, updateUser };
}