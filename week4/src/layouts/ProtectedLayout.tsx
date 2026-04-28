import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const ProtectedLayout = () => {
  const location = useLocation();
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
