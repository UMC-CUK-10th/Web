import { useEffect } from "react";
import API from "../lib/axios";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useAxiosInterceptor = () => {
    const {setUser} = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const responseIC = API.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalReq = error.config;

                // 401 만료 에러가 발생했을 때
                if (error.response?.status === 401 && !originalReq._retry) {
                    originalReq._retry = true;

                    try {
                        // 1. 로컬 스토리지에서 리프레시 토큰 꺼내기
                        const rt = localStorage.getItem("refreshToken");

                        if (!rt) throw new Error("NO REFRESH TOKEN");

                        // 2. 바디에 담아서 재발급 요청
                        const res = await axios.post("http://localhost:8000/v1/auth/refresh", {
                            refreshToken: rt // 백엔드 DTO 필드명 확인
                        });

                        // 3. 새로운 토큰 저장.
                        const { accessToken: newAT, refreshToken: newRT } = res.data.data;
                        localStorage.setItem("accessToken", newAT);
                        localStorage.setItem("refreshToken", newAT);

                        // 4. 기존 요청 재시도
                        originalReq.headers.Authorization = `Bearer ${newAT}`;
                        return API(originalReq);
                    } catch (refreshError) {
                        // 리프레시 토큰도 만료
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");
                        setUser(null);
                        navigate("/login")
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => API.interceptors.response.eject(responseIC);
    }, [setUser, navigate]);
}