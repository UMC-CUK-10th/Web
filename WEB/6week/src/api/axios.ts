import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.yourserver.com', // 실제 서버 주소로 변경하세요! 🌲
});

// 요청 인터셉터: 헤더에 Access Token 주입
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: 401 에러 시 토큰 자동 갱신 로직 🔐
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized 에러이고, 아직 재시도하지 않은 경우에만 실행!
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지 플래그 🚩

      try {
        // Refresh Token으로 새로운 Access Token 발급 요청
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await axios.post('https://api.yourserver.com/v1/auth/refresh', {
          refreshToken,
        });

        const { accessToken } = res.data;
        localStorage.setItem('accessToken', accessToken);

        // 실패했던 이전 요청에 새 토큰을 담아 재시도 🚀
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그아웃 처리
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;