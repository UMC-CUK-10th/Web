import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <div className="h-dvh flex flex-col">
      <Navbar />
      <main className="mt-16 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
