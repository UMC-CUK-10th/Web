import axios, { type InternalAxiosRequestConfig } from "axios";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<string | null> | null = null;

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

// 1. 요청 보낼 때: 공백/줄바꿈/따옴표 싹 다 청소
axiosInstance.interceptors.request.use(
  (config) => {
    const rawToken = localStorage.getItem("accessToken");
    console.log("rawToekn:",rawToken);

    if (rawToken) {
      const cleanToken = rawToken.replace(/^["']|["']$/g, "").trim();
      config.headers.Authorization = `Bearer ${cleanToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. 401 에러 날 때: 리프레시 로직
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomInternalAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url === "/v1/auth/refresh") {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            const refreshToken = localStorage.getItem("refreshToken")?.replace(/^["']|["']$/g, "").trim();
            if (!refreshToken) throw new Error("No refresh token");

            const { data } = await axios.post("http://localhost:8000/v1/auth/refresh", {
              refresh: refreshToken,
            });

            // ✅ 데이터 구조에 상관없이 알맹이만 추출
            const result = data.data || data;
            const newAccess = result.accessToken;
            const newRefresh = result.refreshToken;

            if (newAccess) {
              // ✅ 저장할 때부터 .trim()으로 줄바꿈 완전 박멸
              localStorage.setItem("accessToken", newAccess.trim());
              if (newRefresh) localStorage.setItem("refreshToken", newRefresh.trim());
              return newAccess.trim();
            }
            return null;
          } catch (refreshError) {
            localStorage.clear();
            window.location.href = "/login";
            return null;
          } finally {
            refreshPromise = null;
          }
        })();
      }

      const newToken = await refreshPromise;
      if (newToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newToken.trim()}`;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);