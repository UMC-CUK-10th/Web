import axios, { type InternalAxiosRequestConfig } from "axios";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<string | null> | null = null;

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url?.startsWith("/")) {
      config.url = config.url.substring(1);
    }

    const rawToken = localStorage.getItem("accessToken");
    if (rawToken) {
      const cleanToken = rawToken.replace(/['"]+/g, '').trim();
      if (cleanToken && cleanToken !== "null" && cleanToken !== "undefined") {
        config.headers.Authorization = `Bearer ${cleanToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomInternalAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      
      if (originalRequest.url?.includes("auth/refresh")) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            const rawRefresh = localStorage.getItem("refreshToken");
            if (!rawRefresh) throw new Error("No refresh token");

            const refreshToken = rawRefresh.replace(/['"]+/g, '').trim();

            const { data } = await axios.post("http://localhost:8000/v1/auth/refresh", {
              refresh: refreshToken,
            });

            const result = data.data || data;
            const newAccess = result.accessToken;
            const newRefresh = result.refreshToken; // ✅ 새 refresh token 추출

            if (newAccess) {
              localStorage.setItem("accessToken", newAccess.trim());
              if (newRefresh) {
                localStorage.setItem("refreshToken", newRefresh.trim()); // ✅ 새 refresh token 저장
              }
              return newAccess.trim();
            }
            throw new Error("Token extraction failed");
          } catch (e) {
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
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);