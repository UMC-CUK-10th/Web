import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeLp, unlikeLp } from "../../apis/lp";

function useLikeLpMutation(lpId: number) {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: () => likeLp(lpId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getLpDetail", lpId] });
    },
    onError: (error) => {
      console.error(error);
      alert("좋아요에 실패했습니다.");
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: () => unlikeLp(lpId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getLpDetail", lpId] });
    },
    onError: (error) => {
      console.error(error);
      alert("좋아요 취소에 실패했습니다.");
    },
  });

  return { likeMutation, unlikeMutation };
}

export default useLikeLpMutation;
