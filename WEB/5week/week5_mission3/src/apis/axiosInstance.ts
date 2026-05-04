import axios from 'axios';
import { LOCAL_STORAGE_KEY } from '../constans/key';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 5000,
  withCredentials: true,
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  if (token) {
    const accessToken = token.startsWith('"') ? JSON.parse(token) : token;
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 응답 인터셉터 
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 이미 재시도한 요청이 아닐 때만 실행 (_retry 플래그로 무한 루프 방지)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 표시

      try {
        const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);
        const parsedRefreshToken = refreshToken?.startsWith('"') ? JSON.parse(refreshToken) : refreshToken;
        const res = await axios.post('http://localhost:8000/v1/auth/refresh', {
          refreshToken: parsedRefreshToken,
        });

        if (res.status === 201 || res.status === 200) {
          const newAccessToken = res.data.data.accessToken;
          
          localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error('리프레시 토큰이 만료되었습니다. 다시 로그인해주세요.');
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;