import axios, { type InternalAxiosRequestConfig } from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../constants/key';

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem();

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (originalRequest.url === '/v1/auth/refresh') {
        const { removeItem: removeAccessToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.accessToken,
        );
        const { removeItem: removeRefreshtoken } = useLocalStorage(
          LOCAL_STORAGE_KEY.refreshToken,
        );
        removeAccessToken();
        removeRefreshtoken();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      // 재시도 플래그 설정
      originalRequest._retry = true;

      // 이미 리프레시 요청이 진행중이면, 그 Promise를 재사용합니다.
      if (!refreshPromise) {
        // refresh 요청 실행 후, 프라미스를 전역 변수에 할당
        refreshPromise = (async () => {
          const { getItem: getRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken,
          );
          const refreshToken = getRefreshToken();

          const { data } = await axiosInstance.post('/v1/auth/refresh', {
            refresh: refreshToken,
          });
          // 새 토큰이 반환
          const { setItem: setAccessToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.accessToken,
          );
          const { setItem: setRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken,
          );
          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);
          return data.data.accessToken;
        })()
          .catch((error) => {
            const { removeItem: removeAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken,
            );
            const { removeItem: removeRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken,
            );
            removeAccessToken();
            removeRefreshToken();
          })
          .finally(() => {
            refreshPromise = null;
          });
      }
      return refreshPromise.then((newAccessToken) => {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance.request(originalRequest);
      });
    }
    return Promise.reject(error);
  },
);
