import axios from "axios";

// 1. Axios 인스턴스 생성
const API = axios.create({
    baseURL: "http://localhost:8000/v1",
    withCredentials: true, // 쿠키 사용 시 필수
});

// 2. 요청 인터셉터: 모든 요청에 토큰 자동으로 실어 보내기
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. 응답 인터셉터: 토큰 만료 시 갱신 및 재시도 로직
API.interceptors.response.use(
    (response) => {
        // 성공적인 응답은 그대로 반환
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // 401 Unauthorized 에러가 발생했고, 아직 재시도를 하지 않았다면
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // 무한 루프 방지를 위해 플래그 설정

            try {
                const res = await axios.post("http://localhost:8000/v1/auth/refresh", {}, {
                    withCredentials: true // Refresh Token이 쿠키에 있다면 필수
                });

                const newAccessToken = res.data.accessToken;

                // 새로운 토큰 저장
                localStorage.setItem("accessToken", newAccessToken);

                // 원래 실패했던 요청의 헤더를 새 토큰으로 교체
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // 실패했던 요청으로 다시 재시도
                return API(originalRequest);
            } catch (refreshError) {
                // 갱신조차 실패하면 (리프레시 토큰 만료 등) 로그아웃 처리
                console.error("세션이 만료되었습니다. 다시 로그인해주세요.");
                localStorage.removeItem("accessToken");
                window.location.href = "/login"; 
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default API;