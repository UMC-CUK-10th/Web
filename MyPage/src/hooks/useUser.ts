import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import userRepository from "../repositories/userRepository";
import authRepository from "../repositories/authRepository";
import type { UpdateUserRequest, User } from "../types/User";

export function useUser() {
  const queryClient = useQueryClient();

  const { data: user, isLoading: loading } = useQuery({
    queryKey: ["user"],
    queryFn: userRepository.getMe,
    retry: false,
  });

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: (data: UpdateUserRequest) => userRepository.update(data),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["user"] });

      const previousUser = queryClient.getQueryData<User>(["user"]);

      queryClient.setQueryData(["user"], (old: User) => ({
        ...old,
        ...newData,
      }));

      return { previousUser };
    },
    onError: (_error, _newData, context) => {
      queryClient.setQueryData(["user"], context?.previousUser);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const logout = () => {
    authRepository.removeTokens();
    window.location.href = "/login";
  };

  return { user: user ?? null, loading, logout, updateUser, isUpdating };
}