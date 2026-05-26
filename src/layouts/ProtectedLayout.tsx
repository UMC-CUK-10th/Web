import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const ProtectedLayout = () => {
    const { accessToken } = useAuth();
    
    if (!accessToken) {
        return <Navigate to="/login" replace />; //replace는 히스토리가 남지 않게 하는 옵션
    }
    return <div className="h-dvh flex flex-col bg-[#111111]">
    <nav className="bg-black">
        <Navbar />
    </nav>
    <main className="flex-1">
        <Outlet />
    </main>
    <footer>푸터입니다.</footer>
  </div>
}

export default ProtectedLayout;