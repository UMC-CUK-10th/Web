import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-3xl rotate-12 hover:rotate-0 transition-transform duration-500">
        <span className="text-4xl text-emerald-600">🍯</span>
      </div>

      <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-4">
        더 나은 소통의 시작, <br />
        <span className="text-emerald-600">GGULBEOM Hub</span>
      </h2>

      {/* 설명 문구 */}
      <p className="text-slate-500 text-lg max-w-md mx-auto mb-10 break-keep leading-relaxed">
        복잡한 설정 없이도 스마트하게 관리하는 나만의 공간.
        지금 바로 꿀범 허브에서 시작해보세요!
      </p>

      <div className="flex gap-4">
        {accessToken ? (
          <button
            onClick={() => navigate("/my")}
            className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
          >
            마이페이지로 가기
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 active:scale-95"
            >
              지금 시작하기
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-2xl border border-emerald-100 hover:bg-emerald-50 transition-all active:scale-95"
            >
              회원가입
            </button>
          </>
        )}
      </div>

      <div className="mt-20 grid grid-cols-3 gap-8 opacity-40 grayscale pointer-events-none">
        <span className="text-2xl font-bold">Simple</span>
        <span className="text-2xl font-bold">Smart</span>
        <span className="text-2xl font-bold">Secure</span>
      </div>
    </div>
  );
};

export default HomePage;