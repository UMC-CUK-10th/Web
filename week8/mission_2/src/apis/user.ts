import api from "./axios";

// ================= 프로필 수정 =================
export const updateProfile = async ({
  name,
  bio,
  avatar,
}: {
  name: string;
  bio?: string;
  avatar?: string;
}) => {
  const response = await api.patch("/v1/users", {
    name,
    bio,
    avatar,
  });

  return response.data;
};

// ================= 회원탈퇴 =================
export const deleteAccount = async () => {
  const response = await api.delete("/v1/users/me");

  return response.data;
};