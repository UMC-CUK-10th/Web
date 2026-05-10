import { useAuth } from "../context/auth-context";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    // 로그인 안 된 경우 로그인 페이지로 리다이렉트
    return <Navigate to="/login" replace />;
  }

  // 로그인 된 경우, 자식 컴포넌트 렌더링
  return <>{children}</>;
};

export default ProtectedRoute;
