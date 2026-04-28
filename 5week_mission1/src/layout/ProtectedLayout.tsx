import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedLayout = () => {
    const { accessToken } = useAuth();

    // 토큰이 없다면 로그인 페이지로 이동 (replace를 통해 히스토리 기록을 덮어씌움)
    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};