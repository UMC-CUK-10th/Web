import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchMyInfo } from "../../apis/auth";
import type { PatchMyInfoDto } from "../../types/auth";

function useUpdateMyInfoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: PatchMyInfoDto) => patchMyInfo(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
    onError: (error) => {
      console.error(error);
      alert("프로필 수정에 실패했습니다.");
    },
  });
}

export default useUpdateMyInfoMutation;
