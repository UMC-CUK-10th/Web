import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const Navbar = () => {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuth(); 

  const handleLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      await logout();
      navigate("/"); 
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-emerald-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <h1
          className="cursor-pointer text-2xl font-black tracking-tighter text-emerald-700 hover:opacity-80 transition-opacity"
          onClick={() => navigate("/")}
        >
          GGULBEOM SITE <span className="text-emerald-400 font-medium">Hub</span>
        </h1>

        <div className="flex items-center gap-3">
          {accessToken ? (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="hidden md:block text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors mr-2"
              >
                마이 대시보드
              </button>
              <button
                onClick={handleLogout}
                className="rounded-full bg-slate-800 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-900 shadow-md active:scale-95"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="rounded-full border border-emerald-200 bg-white px-5 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 hover:border-emerald-300"
              >
                로그인
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 shadow-md shadow-emerald-900/10 active:scale-95"
              >
                시작하기 →
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;