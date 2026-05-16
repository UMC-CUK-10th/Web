import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchLp } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { CreateLpsDto } from "../../types/lp";

type PatchLpPayload = {
  lpId: number;
  payload: Partial<CreateLpsDto>;
};

function usePatchLps() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lpId, payload }: PatchLpPayload) =>
      patchLp({
        lpId,
        payload,
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lp, String(variables.lpId)],
      });
    },

    onError: (error) => {
      console.error("LP 수정 실패:", error);
      alert("LP 수정에 실패했습니다.");
    },
  });
}

export default usePatchLps;