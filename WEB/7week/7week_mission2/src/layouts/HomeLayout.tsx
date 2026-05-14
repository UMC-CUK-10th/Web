import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LpCreateModal from "../components/LpCreateModal";
import WithdrawConfirmModal from "../components/WithdrawConfirmModal";

export default function HomeLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLpModalOpen, setIsLpModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-[100dvh] flex-col bg-[#000d1a] text-slate-100">
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="relative flex flex-1 overflow-hidden">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md transition-opacity"
            onClick={toggleSidebar}
          />
        )}

        <aside
          className={`absolute inset-y-0 left-0 z-50 flex w-[260px] flex-col justify-between border-r border-blue-900/30 bg-[#000d1a] py-10 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="flex flex-col gap-3 px-5">
            <Link
              to="/"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-4 rounded-xl px-5 py-3.5 text-[15px] font-medium text-slate-400 transition-all hover:bg-blue-900/20 hover:text-blue-400 group"
            >
              <svg className="text-slate-500 group-hover:text-blue-400 transition-colors" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              찾기
            </Link>
            <Link
              to="/my"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-4 rounded-xl px-5 py-3.5 text-[15px] font-medium text-slate-400 transition-all hover:bg-blue-900/20 hover:text-blue-400 group"
            >
              <svg className="text-slate-500 group-hover:text-blue-400 transition-colors" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              마이페이지
            </Link>
          </nav>

          <div className="px-10">
            <button
              onClick={() => setIsWithdrawModalOpen(true)}
              className="text-[13px] font-medium text-blue-900 transition-colors hover:text-red-900"
            >
              탈퇴하기
            </button>
          </div>
        </aside>

        <main className="flex flex-1 flex-col overflow-y-auto bg-gradient-to-b from-[#000d1a] via-[#001a2c] to-[#002a45]">
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>

      <button
        onClick={() => setIsLpModalOpen(true)}
        className="fixed bottom-10 right-10 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all hover:scale-110 hover:bg-blue-500 active:scale-95"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>

      {isLpModalOpen && (
        <LpCreateModal onClose={() => setIsLpModalOpen(false)} />
      )}

      {isWithdrawModalOpen && (
        <WithdrawConfirmModal onClose={() => setIsWithdrawModalOpen(false)} />
      )}
    </div>
  );
}