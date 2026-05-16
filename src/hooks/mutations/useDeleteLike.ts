import { useMutation } from '@tanstack/react-query';
import { deleteLike } from '../../apis/lp';
import { queryClient } from '../../App';
import { QUERY_KEY } from '../../constants/key';

function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true,
      });
    },
    onError: (error, variables, context) => {},
    onMutate: (variables) => {
      console.log('hi');
    },
    // 요청이 끝난 후 항상 실행됨 (OnSuccess, onError 후에 실행됨)
    // 로딩 상태를 초기화할 때 조금 유용하다.
    onSettled: (data, error, variables, context) => {},
  });
}

export default useDeleteLike;
