import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import Sidebar from "./Sidebar";
import { useSidebar } from "../hooks/queries/useSidebar";

export default function Navbar() {
  const { accessToken, logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const navigate = useNavigate();

  const {
    isOpen: sidebarOpen,
    open: openSidebar,
    close: closeSidebar,
  } = useSidebar();

  const isLoggedIn =
    accessToken !== null &&
    accessToken !== "" &&
    accessToken !== "undefined";

  useEffect(() => {
    if (!isLoggedIn) {
      setData(null);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await getMyInfo();
        setData(response);
      } catch (err) {
        console.error("getMyInfo 실패:", err);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  const handleLogout = async () => {
    await logout();
    setData(null);
    navigate("/");
  };

  return (
    <nav className="fixed left-0 top-0 z-30 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={openSidebar}
            aria-label="메뉴 열기"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:bg-gray-100"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M7.95 11.95h32m-32 12h32m-32 12h32"
              />
            </svg>
          </button>

          <Link
            to="/"
            className="cursor-pointer text-2xl font-bold text-pink-500"
          >
            lily web
          </Link>
        </div>

        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">
              {data?.data?.name
                ? `${data.data.name}님 환영합니다`
                : "환영합니다"}
            </span>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-lg border border-pink-200 bg-pink-50 px-4 py-2 text-sm font-medium text-pink-500 transition hover:bg-pink-100"
            >
              로그인
            </Link>

            <Link
              to="/signup"
              className="rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-600"
            >
              회원가입
            </Link>
          </div>
        )}
      </div>

      <Sidebar open={sidebarOpen} onClose={closeSidebar} />
    </nav>
  );
}