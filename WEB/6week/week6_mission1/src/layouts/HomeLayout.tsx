import { useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HomeLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { accessToken, logout, userName } = useAuth();
  const navigate = useNavigate();

  const isAuth = !!accessToken;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      await logout();
    }
  };

  return (
    // 배경색을 짙은 딥그린(#022c22)으로 변경
    <div className="flex h-[100dvh] flex-col bg-[#022c22] text-stone-100">
      {/* 헤더: 보더 색상을 그린 계열로 변경 */}
      <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-emerald-900/50 bg-[#022c22] px-6">
        <div className="flex items-center gap-6">
          <button
            onClick={toggleSidebar}
            className="text-emerald-500 transition-colors hover:text-emerald-300"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.95 11.95h32m-32 12h32m-32 12h32"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Link
            to="/"
            className="flex items-center gap-1 text-[22px] font-black tracking-[0.18em] uppercase"
          >
            {/* 로고 포인트 컬러: 에메랄드 그린 */}
            <span className="text-emerald-400">GGULBEOM</span>
            <span className="text-stone-300">SITE</span>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-400">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          {isAuth ? (
            <div className="flex items-center gap-4 text-sm">
              <span className="text-emerald-100/70">
                <strong className="text-emerald-300">{userName || "회원"}</strong>님
                환영합니다!!
              </span>
              <button
                onClick={handleLogout}
                className="text-emerald-500 transition-colors hover:text-emerald-300"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4 text-sm font-medium">
              <Link
                to="/login"
                className="text-emerald-100/70 transition-colors hover:text-white"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                // 버튼 색상: 딥그린과 대비되는 민트/에메랄드
                className="rounded-md bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-500 shadow-lg shadow-emerald-900/20"
              >
                회원가입
              </Link>
            </div>
          )}
        </div>
      </header>

      <div className="relative flex flex-1 overflow-hidden">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/70 transition-opacity"
            onClick={toggleSidebar}
          />
        )}

        {/* 사이드바: 딥그린 배경 적용 */}
        <aside
          className={`absolute inset-y-0 left-0 z-50 flex w-[240px] flex-col justify-between border-r border-emerald-900/50 bg-[#022c22] py-8 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="flex flex-col gap-2 px-4">
            <Link
              to="/"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-emerald-100/60 transition-all hover:bg-emerald-900/30 hover:text-emerald-400"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              찾기
            </Link>
            <Link
              to="/my"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-emerald-100/60 transition-all hover:bg-emerald-900/30 hover:text-emerald-400"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              마이페이지
            </Link>
          </nav>

          <div className="px-8">
            <button className="text-[13px] text-emerald-900 transition-colors hover:text-red-400">
              탈퇴하기
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* 플로팅 버튼: 딥그린 테마에 맞춘 에메랄드 컬러 */}
      <button
        onClick={() => navigate("/lp/create")}
        className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-transform hover:scale-110 hover:bg-emerald-400"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
  );
}