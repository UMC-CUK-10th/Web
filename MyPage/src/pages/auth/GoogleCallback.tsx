import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function GoogleCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("accessToken");
        const refreshToken = params.get("refreshToken");

        if (accessToken && refreshToken) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken); // 리프레시 토큰도 저장!
            
            window.location.href = "/";
        } else {
            alert("로그인 정보가 부족합니다.");
            navigate("/login");
        }
    }, [navigate]);

    return <LoadingSpinner title="로그인 중입니다..."/>;
}