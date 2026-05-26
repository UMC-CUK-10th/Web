import { useMutation } from "@tanstack/react-query";
import { deleteUsers } from "../../apis/user";

const useDeleteUsers = () => {
  return useMutation({
    mutationFn: deleteUsers,
    onError: (error) => {
      console.error("회원 탈퇴 실패:", error);
      alert("회원 탈퇴에 실패했습니다.");
    },
  });
};

export default useDeleteUsers;