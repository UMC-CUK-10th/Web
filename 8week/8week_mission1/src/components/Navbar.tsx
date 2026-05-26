import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { getMyInfo } from "../apis/auth";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { accessToken, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: myInfoData } = useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    enabled: !!accessToken,
  });

  const userName = myInfoData?.data?.name || "유저";

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
            SSD
          </Link>
        </div>
        
        <div className="flex items-center space-x-6">
          {!accessToken && (
            <>
              <Link to={"/login"} className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                로그인
              </Link>
              <Link to={"/signup"} className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                회원가입
              </Link>
            </>
          )}

          {accessToken && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {userName}님 환영합니다!
              </span>
              
              <Link to={"/my"} className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 underline">
                내 정보
              </Link>

              <button
                onClick={logout}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 underline cursor-pointer bg-transparent border-none p-0"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </nav>
  );
};

export default Navbar;