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
                        // 재발급 요청
                        const res = await axios.post("http://localhost:8000/v1/auth/refresh", {}, { withCredentials: true });

                        const newAT = res.data.data.accessToken;
                        localStorage.setItem("accessToken", newAT);

                        originalReq.headers.Authorization = `Bearer ${newAT}`;
                        return API(originalReq);
                    } catch (refreshError) {
                        // 리프레시 토큰도 만료
                        localStorage.removeItem("accessToken");
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