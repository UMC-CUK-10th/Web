import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

interface ProtectedRouteProps {
    children?: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user } = useUserContext();

    if (!user) {
        return <Navigate to="/login" replace />     
    }

    return children ? <>{children}</> : <Outlet />;
}