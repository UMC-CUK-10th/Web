import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function Layout() {
  const location = useLocation();

  // 상세페이지인지 체크
  const isDetailPage = location.pathname.startsWith("/movies/");

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-[1200px] mx-auto">
        
        {/* 상세페이지에서는 Navbar 숨김 */}
        {!isDetailPage && <Navbar />}

        <Outlet />
      </div>
    </div>
  );
}

export default Layout;