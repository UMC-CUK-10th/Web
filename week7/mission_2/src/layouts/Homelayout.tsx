import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import { useState } from "react";

const Homelayout = () => {
  const { user, setUser } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  const handleLogout = () => {
    setUser(null);

    localStorage.removeItem(
      "accessToken"
    );

    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 헤더 */}
      <header
        className="
          fixed
          top-0
          left-0
          w-full
          h-16
          bg-[#111]
          border-b
          border-gray-800
          flex
          items-center
          justify-between
          px-6
          z-50
        "
      >
        {/* 왼쪽 */}
        <div className="flex items-center gap-4">
          {/* 모바일 버거 */}
          <button
            className="md:hidden"
            onClick={() =>
              setIsSidebarOpen(true)
            }
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 48 48"
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
            className="
              text-3xl
              font-bold
              text-pink-500
            "
          >
            LP
          </Link>
        </div>

        {/* 오른쪽 */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="
                  px-4
                  py-2
                  bg-pink-500
                  rounded-md
                "
              >
                로그인
              </Link>

              <Link
                to="/signup"
                className="
                  px-4
                  py-2
                  border
                  border-pink-500
                  rounded-md
                "
              >
                회원가입
              </Link>
            </>
          ) : (
            <>
              <span>
                {user.name}님 반갑습니다.
              </span>

              <Link to="/mypage">
                마이페이지
              </Link>

              <button
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </header>

      {/* 모바일 오버레이 */}
      {isSidebarOpen && (
        <div
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            md:hidden
          "
          onClick={() =>
            setIsSidebarOpen(false)
          }
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`
          fixed
          top-16
          left-0
          w-60
          h-full
          bg-[#0b0b0b]
          border-r
          border-gray-800
          p-5
          z-50
          transition-transform

          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
        `}
      >
        <div className="space-y-6">
          <Link
            to="/"
            className="block"
          >
            홈
          </Link>

          <Link
            to="/mypage"
            className="block"
          >
            마이페이지
          </Link>
        </div>
      </aside>

      {/* 메인 */}
      <main
        className="
          pt-20
          px-5
          md:ml-60
        "
      >
        <Outlet />
      </main>

      {/* 플로팅 버튼 */}
    </div>
  );
};

export default Homelayout;