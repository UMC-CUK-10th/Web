import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

    if (accessToken) {
      const parsedAccessToken = JSON.parse(accessToken);
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${parsedAccessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomInternalAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (originalRequest.url === "/v1/auth/refresh") {
        localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
        localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          const refreshToken = localStorage.getItem(
            LOCAL_STORAGE_KEY.refreshToken
          );

          const parsedRefreshToken = refreshToken
            ? JSON.parse(refreshToken)
            : null;

          const { data } = await axios.post(
            `${import.meta.env.VITE_SERVER_API_URL}/v1/auth/refresh`,
            {
              refreshToken: parsedRefreshToken,
            },
            {
              withCredentials: true,
            }
          );

          localStorage.setItem(
            LOCAL_STORAGE_KEY.accessToken,
            JSON.stringify(data.data.accessToken)
          );
          localStorage.setItem(
            LOCAL_STORAGE_KEY.refreshToken,
            JSON.stringify(data.data.refreshToken)
          );

          return data.data.accessToken;
        })()
          .catch((refreshError) => {
            localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
            localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
            window.location.href = "/login";
            return Promise.reject(refreshError);
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      return refreshPromise.then((newAccessToken) => {
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      });
    }

    return Promise.reject(error);
  }
);