import { useState } from 'react';
import { useCustomFetch } from '../hooks/useCustomFetch';

interface UserData {
  id: number;
  name: string;
  email: string;
}

const UserDataDisplay = () => {
  const [userId, setUserId] = useState<number>(3);
  const [isVisible, setIsVisible] = useState(true);

  const { data, isPending, isError, isFetching, error } = useCustomFetch<UserData>(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center pt-24 px-4 font-sans text-slate-900">
      
      <div className="fixed top-6 left-1/2 -translate-x-1/2 flex gap-3 p-2 bg-white/70 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl z-50 w-full max-w-2xl justify-center">
        <button 
          onClick={() => setUserId(Math.floor(Math.random() * 10) + 1)}
          className="px-5 py-2.5 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-emerald-300 transition-all duration-200 active:scale-95 shadow-sm"
        >
          🎲 다른 사용자
        </button>
        <button 
          onClick={() => setIsVisible(!isVisible)}
          className={`px-5 py-2.5 font-semibold rounded-xl transition-all duration-200 active:scale-95 shadow-sm border ${
            isVisible 
              ? "bg-slate-800 text-white border-slate-800 hover:bg-slate-700" 
              : "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600"
          }`}
        >
          {isVisible ? "👁️ 컴포넌트 숨기기" : "👀 다시 보기"}
        </button>
        <button 
          onClick={() => setUserId(999999)}
          className="px-5 py-2.5 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-all duration-200 active:scale-95 shadow-md border border-orange-400"
        >
          ⚠️ 재시도 테스트
        </button>
      </div>

      <div className="w-full max-w-lg mt-10 transition-all duration-500 ease-in-out">
        {isVisible ? (
          <div className="relative overflow-hidden bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 group">
            
            <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-50">
              {(isPending || isFetching) && (
                <div className="h-full bg-emerald-500 animate-[loading_2s_infinite] transition-all" style={{ width: '40%' }}></div>
              )}
            </div>

            {isPending ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-10 bg-slate-200 rounded-lg w-3/4"></div>
                <div className="h-6 bg-slate-100 rounded-lg w-1/2"></div>
                <div className="h-4 bg-slate-50 rounded-lg w-1/4 pt-4"></div>
              </div>
            ) : isError ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">🚧</div>
                <h2 className="text-xl font-bold text-slate-800">데이터를 가져오지 못했어요</h2>
                <p className="text-slate-400 mt-2 text-sm">사유: {error instanceof Error ? error.message : '알 수 없는 오류'}</p>
                <div className="mt-6 text-xs text-orange-500 font-mono animate-pulse">자동으로 재시도 중입니다...</div>
              </div>
            ) : (
              <div className="relative">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold mb-4">
                  SUCCESSFULLY LOADED
                </span>
                <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-2 leading-tight">
                  {data?.name}
                </h1>
                <p className="text-xl text-slate-500 font-medium mb-8">
                  {data?.email}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <span className="text-xs font-bold text-slate-300 tracking-widest uppercase">Member Identity</span>
                  <span className="px-3 py-1 bg-slate-100 rounded text-slate-500 font-mono text-sm">ID: {data?.id}</span>
                </div>
              </div>
            )}

            {isFetching && !isPending && (
              <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-white rounded-full text-[10px] font-bold shadow-lg animate-bounce">
                <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                REFETCHING...
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-300 italic border-2 border-dashed border-slate-200 rounded-3xl">
            컴포넌트가 언마운트된 상태입니다.🐾
          </div>
        )}
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default UserDataDisplay;