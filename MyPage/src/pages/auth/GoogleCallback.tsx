import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import authRepository from "../../repositories/authRepository";

export default function GoogleCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("accessToken");
        const refreshToken = params.get("refreshToken");

        if (accessToken && refreshToken) {
            authRepository.saveTokens(accessToken, refreshToken);
            
            window.location.href = "/";
        } else {
            alert("로그인 정보가 부족합니다.");
            navigate("/login");
        }
    }, [navigate]);

    return <LoadingSpinner title="로그인 중입니다..."/>;
}