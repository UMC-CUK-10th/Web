import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const LoginPage = () => {
    const { login, accessToken } = useAuth();
    const navigate = useNavigate();

    // 이미 로그인된 사용자가 로그인 페이지에 접근 시 홈으로 보내기
    useEffect(() => {
        if (accessToken) {
            navigate("/"); // 상황에 따라 "/my" 로 이동하게끔 해도 무방합니다
        }
    }, [accessToken, navigate]);

    const handleLogin = async (data: RequestSignInDto) => {
        try {
            await login(data);
            navigate("/my"); // 로그인 성공 시 마이페이지로 이동
        } catch (error) {
            // 에러처리는 AuthContext 내부에서 진행되거나 여기서 진행할 수 있습니다.
            console.log(error);
        }
    };

    return (
        // ... (회원가입/로그인 UI 코드 등은 영상에서 기존 코드 그대로 사용)
        <></>
    );
};