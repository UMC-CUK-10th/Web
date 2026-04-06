import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Layout() {
  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-[1200px] mx-auto">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;