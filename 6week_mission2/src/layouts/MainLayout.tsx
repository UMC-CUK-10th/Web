import { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  // 모바일/협소 화면에서 버거 메뉴 클릭 시 사이드바 토글을 위한 상태
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, accessToken, logout } = useAuth();

  return (
    <div className="min-h-screen w-full bg-white text-gray-800">
      
      {/* =========================================================
          3번: 모바일 사이드바 외부 영역(백드롭) 클릭 시 닫히는 로직
         ========================================================= */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 모바일에서 버거 버튼 누르면 스르륵 열리는 임시 사이드바 */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-200 bg-white p-5 transition-transform duration-300 ease-in-out md:hidden
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col gap-4">
          <div className="text-xl font-bold border-b pb-2">메뉴</div>
          <a href="/" onClick={() => setIsSidebarOpen(false)} className="py-2 font-medium">홈</a>
          <a href="/my" onClick={() => setIsSidebarOpen(false)} className="py-2 font-medium">마이페이지</a>
          <a href="/search" onClick={() => setIsSidebarOpen(false)} className="py-2 font-medium">검색</a>
          {accessToken && (
            <button onClick={() => { logout(); setIsSidebarOpen(false); }} className="text-left text-red-500 py-2 font-medium">로그아웃</button>
          )}
        </div>
      </aside>

      {/* =========================================================
          1번 & 2번: 상단 내비게이션 헤더 바 (보내주신 화면과 싱크 100%)
         ========================================================= */}
      <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
        
        {/* 왼쪽 영역: 버거 아이콘 + SSD */}
        <div className="flex items-center gap-3">
          {/* 3번 요건: 버거 버튼 (모바일/협소 화면에서 기본 노출, md 이상 스타일 유지) */}
          <button 
            type="button" 
            className="text-gray-700 hover:text-gray-900 cursor-pointer p-1"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Menu"
          >
            <svg width="28" height="28" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="block">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M7.95 11.95h32m-32 12h32m-32 12h32"/>
            </svg>
          </button>
          
          {/* 로고 타이틀 */}
          <a href="/" className="text-2xl font-black tracking-wider text-black">
            SSD
          </a>
        </div>

        {/* 우측 영역: 마이페이지(환영문구로 대체) | 검색 */}
        <div className="flex items-center gap-6 font-medium text-gray-700">
          
          {/* 💡 2번 요건 핵심: 로그인 상태라면 '마이페이지' 대신 '00님 환영합니다!' 노출 */}
          {accessToken && user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-blue-600">
                {user.name}님 환영합니다!
              </span>
              <button 
                onClick={logout} 
                className="text-xs text-gray-400 hover:text-red-500 underline ml-1 cursor-pointer"
              >
                로그아웃
              </button>
            </div>
          ) : (
            // 비로그인 상태일 때는 원래대로 마이페이지(또는 로그인 유도) 링크 노출
            <a href="/login" className="hover:text-black transition-colors">
              마이페이지
            </a>
          )}

          <a href="/search" className="hover:text-black transition-colors">
            검색
          </a>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 (고양이 그리드 리스트 등이 출력되는 곳) */}
      <main className="w-full">
        {children}
      </main>

    </div>
  );
};

export default MainLayout;