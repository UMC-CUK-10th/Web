import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { Lp } from "../../types/lp";

type UseDeleteLikeProps = {
  lpId: number;
  currentUserId?: number;
};

const useDeleteLike = ({ lpId, currentUserId }: UseDeleteLikeProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteLike(lpId),

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lp, String(lpId)],
      });

      const previousLp = queryClient.getQueryData<Lp>([
        QUERY_KEY.lp,
        String(lpId),
      ]);

      if (previousLp) {
        queryClient.setQueryData<Lp>([QUERY_KEY.lp, String(lpId)], {
          ...previousLp,
          likes: (previousLp.likes ?? []).filter((like: any) => {
            return !(
              like.userId === currentUserId ||
              like.user?.id === currentUserId ||
              like.id === currentUserId
            );
          }),
        });
      }

      return { previousLp };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousLp) {
        queryClient.setQueryData(
          [QUERY_KEY.lp, String(lpId)],
          context.previousLp
        );
      }

      alert("좋아요 취소에 실패했습니다.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lp, String(lpId)],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });
    },
  });
};

export default useDeleteLike;