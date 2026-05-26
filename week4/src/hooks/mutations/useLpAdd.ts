import { useMutation } from "@tanstack/react-query";
import { postLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

interface UseLpAddProps {
  onSuccessCallback?: (data: unknown) => void;
}

function useLpAdd({ onSuccessCallback }: UseLpAddProps = {}) {
  return useMutation({
    mutationFn: postLp,
    onSuccess: (data) => {
      console.log("LP 추가 성공");

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });

      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
    },
    onError: (error) => {
      console.error("LP 추가 실패:", error);
      alert("LP 추가에 실패했습니다. 다시 시도해주세요.");
    },
  });
}

export default useLpAdd;