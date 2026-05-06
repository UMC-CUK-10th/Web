import axios from 'axios';
import { LOCAL_STORAGE_KEY } from '../constants/key';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const rawToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

    console.log('[최종 토큰 확인]:', `|${rawToken}|`);

    if (rawToken) {
      const cleanToken = rawToken.trim().replace(/^"|"$/g, '');
      config.headers.Authorization = `Bearer ${cleanToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
