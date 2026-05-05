// components/ProtectedRoute.tsx
import { Navigate, useLocation, Outlet } from "react-router-dom";

export default function ProtectedRoute({ isLogin }: { isLogin: boolean }) {
  const location = useLocation();

  if (!isLogin) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}