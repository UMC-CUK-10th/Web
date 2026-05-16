import api from "./axios";

// ================= 로그인 =================
export const login =
  async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response =
      await api.post(
        "/v1/auth/signin",
        {
          email,
          password,
        }
      );

    return response.data;
  };

// ================= 로그아웃 =================
export const logout =
  async () => {
    const response =
      await api.post(
        "/v1/auth/signout"
      );

    return response.data;
  };

// ================= 회원 탈퇴 =================
export const deleteUser =
  async () => {
    const response =
      await api.delete(
        "/v1/users/me"
      );

    return response.data;
  };

// ================= 유저 정보 수정 =================
export const updateProfile =
  async (formData: FormData) => {
    const response =
      await api.patch(
        "/v1/users",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };