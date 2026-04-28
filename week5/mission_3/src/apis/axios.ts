import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/v1",
  withCredentials: true, // 🔥 refresh token 쿠키
});


// ✅ 1️⃣ 요청 인터셉터 (토큰 자동 붙이기)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// ✅ 2️⃣ 응답 인터셉터 (🔥 핵심)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔥 토큰 만료 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 🔥 refresh 요청
        const res = await axios.post(
          "http://localhost:8000/v1/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.data.accessToken;

        // 🔥 새 토큰 저장
        localStorage.setItem("accessToken", newAccessToken);

        // 🔥 기존 요청에 토큰 다시 넣기
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 🔥 요청 재시도
        return api(originalRequest);

      } catch (refreshError) {
        // 🔥 refresh 실패 → 로그인 페이지 이동
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;