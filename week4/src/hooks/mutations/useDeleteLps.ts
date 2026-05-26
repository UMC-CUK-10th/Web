import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useDeleteLps() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lpId: number) =>
      deleteLp({
        lpId,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });
    },

    onError: (error) => {
      console.error("LP 삭제 실패:", error);
      alert("LP 삭제에 실패했습니다.");
    },
  });
}

export default useDeleteLps;