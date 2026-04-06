import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans">
      

      <nav className="fixed top-0 left-0 z-50 w-full border-b border-emerald-100 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <h1
            className="cursor-pointer text-2xl font-black tracking-tighter text-emerald-700"
            onClick={() => navigate("/")}
          >
            GGULBEOM SITE <span className="text-emerald-400">Hub</span>
          
          </h1>

          <div className="flex items-center gap-3">
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
          </div>
        </div>
      </nav>

      <main className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-24 pb-16">

        <section className="text-center py-16">
          <p className="mb-4 text-sm font-bold tracking-[0.3em] uppercase text-emerald-500">
            CONNECT & GROW WITH US
          </p>
          <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8 tracking-tighter text-slate-950">
            새로운 소통의 시작, <span className="text-emerald-600">GGULBEOM Web</span>
          </h2>
          <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed mb-12 break-keep font-medium">
            복잡한 일상 속에서 더 스마트하고 직관적으로 연결되는 방법을 찾고 계신가요?
            GGULBEOM SITE은 당신의 일상을 효율적으로 관리하고, 중요한 사람들과의 소통을 돕는 통합 플랫폼입니다.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-950/20 text-sm tracking-wide"
          >
            지금 바로 무료로 시작하기
          </button>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <span className="text-4xl">🌱</span>
            <h3 className="mt-5 text-xl font-extrabold text-slate-950 group-hover:text-emerald-700 transition-colors">스마트한 일상 관리</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 font-medium">
              to-do 리스트와 캘린더를 한곳에서 관리하며 당신의 생산성을 극대화합니다. 일상의 작은 변화가 큰 성장을 만듭니다.
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <span className="text-4xl">💬</span>
            <h3 className="mt-5 text-xl font-extrabold text-slate-950 group-hover:text-emerald-700 transition-colors">직관적인 실시간 소통</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 font-medium">
              팀원 또는 친구들과 실시간으로 대화하고 파일을 공유하세요. 어떤 환경에서도 끊김 없는 커뮤니케이션을 보장합니다.
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <span className="text-4xl">🔒</span>
            <h3 className="mt-5 text-xl font-extrabold text-slate-950 group-hover:text-emerald-700 transition-colors">강력한 데이터 보안</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 font-medium">
              우리는 당신의 개인정보를 최우선으로 생각합니다. 최신 암호화 기술로 당신의 데이터를 안전하게 보호합니다.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;