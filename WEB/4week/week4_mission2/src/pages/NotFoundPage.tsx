import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center
                 bg-[#041a13] text-center px-6 select-none overflow-hidden"
    >
      {/* --- 중앙 원형 그래픽 --- */}
      <div className="relative w-40 h-40 mb-12">
        <div
          className="w-full h-full rounded-full bg-emerald-950/30
                     border-4 border-emerald-900/40
                     flex items-center justify-center animate-pulse"
        >
          <div
            className="w-[75%] h-[75%] rounded-full border border-emerald-800/30
                       flex items-center justify-center"
          >
            <div
              className="w-[55%] h-[55%] rounded-full border border-emerald-700/20
                         flex items-center justify-center"
            >

              <div className="text-4xl animate-bounce">🐝</div>
            </div>
          </div>
        </div>

        <div
          className="absolute -top-2 -right-2 w-12 h-12 rounded-full
                     bg-emerald-500 text-[#041a13]
                     flex items-center justify-center
                     text-xs font-black tracking-tighter shadow-lg shadow-emerald-900/50"
        >
          404
        </div>
      </div>

      <p className="text-emerald-400 tracking-[0.4em] text-[11px] font-bold uppercase mb-4">
        Page Not Found
      </p>

      <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter">
        길을 잃으셨나요?
      </h1>

      <p className="text-emerald-100/40 text-sm md:text-base max-w-xs leading-relaxed mb-12 font-medium">
        요청하신 페이지가 숲속으로 사라졌어요.
        <br />
        <span className="italic">"아이고야아아..... 🍯"</span>
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-emerald-600 text-white px-10 py-4
                   text-xs font-bold tracking-[0.25em] uppercase rounded-full
                   hover:bg-emerald-500 hover:scale-105 transition-all shadow-xl shadow-emerald-950/40"
      >
        숲에서 탈출하기 →
      </button>

      <div
        className="absolute left-[-10%] bottom-[10%]
                   w-64 h-64 rounded-full border-[25px] border-emerald-900/10 pointer-events-none"
      />
      <div
        className="absolute right-[-5%] top-[15%]
                   w-40 h-40 rounded-full border-[15px] border-emerald-900/10 pointer-events-none"
      />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
};

export default NotFoundPage;