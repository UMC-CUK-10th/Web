const LoadingSpinner = ({ message = "달콤한 로딩 중..." }: { message?: string }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm z-[9999]">
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
        
        <div className="absolute text-3xl animate-bounce">
          🍯
        </div>
      </div>

      {/* 안내 메시지 */}
      <div className="mt-8 text-center">
        <h2 className="text-xl font-bold text-slate-800 animate-pulse">
          {message}
        </h2>
        <p className="mt-2 text-slate-400 text-sm font-medium tracking-tight">
          잠시만 기다려주세요.!.!.!
        </p>
      </div>

      {/* 배경 장식 블러 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

export default LoadingSpinner;