import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile, type UpdateProfilePayload } from "../../apis/auth";
import { QUERY_KEY } from "../../constants/key";

// 만약 UpdateProfilePayload 인터페이스를 직접 수정할 수 없다면 
// 여기서 새로운 타입을 정의해서 사용합니다.
interface LocalUpdatePayload {
  nickname: string;
  bio: string;
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // 💡 mutationFn: UI에서 받은 nickname을 서버 필드명인 name으로 매핑합니다.
    mutationFn: (payload: LocalUpdatePayload) => 
      updateProfile({
        name: payload.nickname, // 서버가 name을 기대한다면 이렇게 매핑
        bio: payload.bio
      } as UpdateProfilePayload),

    // 💡 낙관적 업데이트 시작
    onMutate: async (newProfile) => {
      // 1. 기존 쿼리 취소
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });

      // 2. 이전 상태 백업
      const previousUserInfo = queryClient.getQueryData([QUERY_KEY.myInfo]);

      // 3. UI 즉시 업데이트 (사용자에게 보일 필드들을 업데이트)
      queryClient.setQueryData([QUERY_KEY.myInfo], (old: any) => ({
        ...old,
        data: {
          ...old?.data,
          // 서버 데이터 구조에 따라 nickname 또는 name을 업데이트합니다.
          nickname: newProfile.nickname, 
          name: newProfile.nickname, 
          bio: newProfile.bio,
        },
      }));

      return { previousUserInfo };
    },

    // 💡 에러 발생 시 롤백
    onError: (error, newProfile, context) => {
      console.error("프로필 수정 실패:", error);
      if (context?.previousUserInfo) {
        queryClient.setQueryData([QUERY_KEY.myInfo], context.previousUserInfo);
      }
      alert("프로필 수정에 실패했습니다. 다시 시도해주세요.");
    },

    // 💡 마무리 동기화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
  });
};