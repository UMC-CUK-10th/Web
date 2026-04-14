import { Navigate, Outlet } from "react-router-dom";

interface Props {
    isLogin: boolean;
}

export default function ProtectedRoute({ isLogin }: Props) {
    if (!isLogin) {
        // ReactStrictMode 때문에 2번 동작함.
        // 빌드 시점에서는 1번만 동작한다고 함.
        alert("로그인이 필요합니다.")
        return <Navigate to="/login" replace/>
    }

    return <Outlet/>
}