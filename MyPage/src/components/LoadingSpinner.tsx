// components/FullPageLoader.tsx
export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50">
      {/* 스피너 본체 */}
      <div className="relative flex items-center justify-center">
        {/* 바깥쪽 회전 원 */}
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
        
        {/* 중앙 로고 아이콘 (선택사항: 원하는 아이콘으로 교체 가능) */}
        <div className="absolute">
          <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></div>
        </div>
      </div>

      {/* 안내 문구 */}
      <div className="mt-6 flex flex-col items-center gap-1">
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">잠시만 기다려주세요</h2>
        <p className="text-sm text-slate-500">정보를 불러오는 중입니다.</p>
      </div>

      {/* 하단 장식선 (세련된 느낌 추가) */}
      <div className="absolute bottom-10">
        <div className="flex gap-1.5">
          <div className="h-1 w-1 rounded-full bg-slate-300"></div>
          <div className="h-1 w-1 rounded-full bg-slate-300"></div>
          <div className="h-1 w-1 rounded-full bg-slate-300"></div>
        </div>
      </div>
    </div>
  );
}