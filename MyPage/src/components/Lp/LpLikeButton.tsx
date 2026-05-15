// components/LikeButton.tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLike, deleteLike } from "../../hooks/LpLike";
import { useUserContext } from "../../context/UserContext";
import type { Lp, LpBase, LpListResponse, LpResponse } from "../../types/Lp";

interface LpLikeButtonProps {
  lp: LpBase;
}

export default function LpLikeButton({ lp }: LpLikeButtonProps) {
  const { user } = useUserContext();
  const queryClient = useQueryClient();

  const isLiked = lp.likes.some((like) => like.userId === user?.id);

  const updatedLikes = isLiked ? 
    lp.likes.filter((like) => like.userId !== user?.id) :
    [...lp.likes, { id: Date.now(), userId: user!.id, lpId: lp.id }];
  
    const { mutate: toggleLike } = useMutation({
    mutationFn: (): Promise<void> => isLiked ? deleteLike(lp.id) : addLike(lp.id),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["lps"] });
      const previousLps = queryClient.getQueryData<LpListResponse>(["lps"]);

      queryClient.setQueryData<LpListResponse>(["lps"], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((item: Lp) =>
            item.id !== lp.id ? item : { ...item, likes: updatedLikes }
          ),
        };
      });

      await queryClient.cancelQueries({ queryKey: ["lp", lp.id] });
      const previousLp = queryClient.getQueryData<LpResponse>(["lp", lp.id]);
      queryClient.setQueryData<LpResponse>(["lp", lp.id], (old) => {
        if (!old) return old;
        return { ...old, likes: updatedLikes };
      });

      return { previousLps, previousLp };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["lps"], context?.previousLps);
      queryClient.setQueryData(["lp", lp.id], context?.previousLp);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      queryClient.invalidateQueries({ queryKey: ["lp", lp.id] });
    },
  });

  if (!user) return null;

  return (
    <button
      onClick={() => toggleLike()}
      className={`flex items-center gap-1 text-sm transition ${
        isLiked ? "text-red-400" : "text-gray-400 hover:text-red-400"
      }`}
    >
      {isLiked ? "❤️" : "🤍"} {lp.likes.length}
    </button>
  );
}