import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import userRepository from "../repositories/userRepository";
import authRepository from "../repositories/authRepository";
import type { UpdateUserRequest } from "../types/User";

export function useUser() {
  const queryClient = useQueryClient();

  const { data: user, isLoading: loading } = useQuery({
    queryKey: ["user"], // ← 이 key로 invalidateQueries가 찾아서 갱신
    queryFn: userRepository.getMe,
    retry: false, // 토큰 없을 때 불필요한 재시도 방지
  });

  const { mutate: updateUser } = useMutation({
    mutationFn: (data: UpdateUserRequest) => userRepository.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  })

  const logout = () => {
    authRepository.removeTokens();
    window.location.href = "/login";
  };

  return { user: user ?? null, loading, logout, updateUser };
}