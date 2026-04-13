import { Outlet, useNavigate } from "react-router-dom";

const HomeLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#041a13] text-emerald-50/90 font-sans">
      
      <header className="sticky top-0 z-50 w-full border-b border-emerald-900/20 bg-[#041a13]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 
            className="text-xl font-black tracking-tighter text-emerald-400 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate("/")}
          >
            <h1
            className="cursor-pointer text-2xl font-black tracking-tighter text-emerald-700"
            onClick={() => navigate("/")}
          >
            GGULBEOM SITE <span className="text-emerald-400">Hub</span>
          
          </h1>
          </h1>

          <div className="flex items-center gap-6 text-sm font-bold">
            <button onClick={() => navigate("/login")} className="px-4 py-1.5 rounded-full border border-emerald-500/30 hover:bg-emerald-500/10 transition-all">로그인</button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        <Outlet />
      </main>

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