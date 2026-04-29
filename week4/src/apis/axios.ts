import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import type { ResponseSigninDto } from "../types/auth";

interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const getAccessToken = () => localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
const getRefreshToken = () => localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);

const setAuthTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, accessToken);
  localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, refreshToken);
};

const clearAuthTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
  localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
};

const redirectToLogin = () => {
  if (window.location.pathname !== "/login") {
    window.location.replace("/login");
  }
};

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

const refreshAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error("리프레시 토큰이 없습니다.");
  }

  const { data } = await refreshAxiosInstance.post<ResponseSigninDto>(
    "/v1/auth/refresh",
    {
      refresh: refreshToken,
    }
  );

  const { accessToken, refreshToken: nextRefreshToken } = data.data;
  setAuthTokens(accessToken, nextRefreshToken);

  return accessToken;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableAxiosRequestConfig | undefined;
    const status = error.response?.status;

    if (!originalRequest || status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("/v1/auth/refresh")) {
      clearAuthTokens();
      redirectToLogin();
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      const newAccessToken = await refreshPromise;

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      clearAuthTokens();
      redirectToLogin();
      return Promise.reject(refreshError);
    }
  }
);
