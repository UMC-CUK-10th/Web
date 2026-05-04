import axios from 'axios';

const axiosInstance = axios.create({
  // [1] 백엔드 서버 주소
  baseURL: 'http://localhost:8000', 
  // [2] 요청 타임아웃 (5초)
  timeout: 5000,
  // [3] 쿠키나 인증 헤더를 같이 보낼지 설정
  withCredentials: true,
});

// [4] 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      try {
 
        const accessToken = token.startsWith('"') ? JSON.parse(token) : token;
        config.headers.Authorization = `Bearer ${accessToken}`;
      } catch (error) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;