import { useMutation } from "@tanstack/react-query";
import { patchUsers, type patchUsersProps } from "../../apis/user";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App";
import type { ResponseMyInfoDto } from "../../types/auth";

function usePatchUsers() {
  return useMutation({
    mutationFn: (editData: patchUsersProps) => patchUsers(editData),

    onMutate: async (editData) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.myInfo],
      });

      const previousUserInfo =
        queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);

      const newUserInfo = previousUserInfo
        ? {
            ...previousUserInfo,
            data: {
              ...previousUserInfo.data,
              ...editData,
            },
          }
        : previousUserInfo;

      queryClient.setQueryData([QUERY_KEY.myInfo], newUserInfo);

      return { previousUserInfo };
    },

    onError: (error, _editData, context) => {
      console.error(error);

      if (context?.previousUserInfo) {
        queryClient.setQueryData(
          [QUERY_KEY.myInfo],
          context.previousUserInfo
        );
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
      });
    },
  });
}

export default usePatchUsers;