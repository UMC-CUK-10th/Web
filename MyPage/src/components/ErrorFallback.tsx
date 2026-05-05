import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  resetErrorBoundary?: () => void; // 에러 핸들러와 연동 시 사용
}

export default function ErrorFallback({
  title = "문제가 발생했습니다",
  message = "데이터를 불러오는 중 예상치 못한 에러가 발생했어요.",
  resetErrorBoundary,
}: ErrorFallbackProps) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center p-6 text-center">
      {/* 아이콘 영역 */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 text-rose-500">
        <AlertTriangle size={40} />
      </div>

      {/* 텍스트 영역 */}
      <h2 className="mb-2 text-2xl font-bold text-gray-900">{title}</h2>
      <p className="mb-8 max-w-md text-gray-500 leading-relaxed">
        {message}
      </p>

      {/* 버튼 영역 */}
      <div className="flex flex-col sm:flex-row gap-3">
        {resetErrorBoundary && (
          <button
            onClick={resetErrorBoundary}
            className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 py-2.5 font-semibold text-white transition-hover hover:bg-gray-800"
          >
            <RefreshCw size={18} />
            다시 시도하기
          </button>
        )}
        
        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-2.5 font-semibold text-gray-700 transition-hover hover:bg-gray-50"
        >
          <Home size={18} />
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}