import { Outlet, useNavigate } from "react-router-dom";

const HomeLayout = () => {
  const navigate = useNavigate();

  return (
    // 1. 전체 컨테이너: 깊은 숲속의 다크 그린 배경 🌲
    <div className="min-h-screen flex flex-col bg-[#041a13] text-emerald-50/90 font-sans">
      
      {/* --- 2. NAVIGATION BAR --- */}
      {/* 중복된 h1 태그를 제거하여 Hydration 에러를 해결했습니다! 🐾 */}
      <header className="sticky top-0 z-50 w-full border-b border-emerald-900/20 bg-[#041a13]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* 로고 섹션: h1은 단 하나만 사용합니다 🍯 */}
          <h1 
            className="text-2xl font-black tracking-tighter text-emerald-400 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate("/")}
          >
            GGULBEOM SITE <span className="text-emerald-700">Hub</span>
          </h1>

          {/* 메뉴 버튼들 🐾 */}
          <div className="flex items-center gap-6 text-sm font-bold">
            <button 
              onClick={() => navigate("/login")} 
              className="px-4 py-1.5 rounded-full border border-emerald-500/30 hover:bg-emerald-500/10 transition-all active:scale-95"
            >
              로그인
            </button>
            <button 
              onClick={() => navigate("/signup")} 
              className="px-4 py-1.5 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 transition-all active:scale-95 shadow-lg shadow-emerald-950/20"
            >
              회원가입
            </button>
          </div>
        </div>
      </header>

      {/* --- 3. MAIN CONTENT --- */}
      {/* Outlet을 통해 각 페이지(홈, 로그인, 회원가입 등)가 여기에 렌더링됩니다 🍯 */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* --- 4. MINIMAL FOOTER --- */}
      {/* 요청하신 대로 깔끔하게 텍스트만 배치했습니다 🐾 */}
      <footer className="w-full py-10 border-t border-emerald-900/20 bg-black/10">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-xs font-black tracking-[0.4em] text-emerald-800 uppercase">
            GGULBEOM SITE
          </p>
          <div className="w-8 h-px bg-emerald-900/30" />
        </div>
      </footer>
    </div>
  );
};

export default HomeLayout;