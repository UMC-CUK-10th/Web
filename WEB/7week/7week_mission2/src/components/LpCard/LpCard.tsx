import { Link } from "react-router-dom";
import type { LP } from "../../types/lp";

interface LpCardProps {
  lp: LP;
}

export default function LpCard({ lp }: LpCardProps) {
  // 데이터 깨짐 방지: 백엔드 필드명에 따라 author.name 또는 authorId를 유연하게 선택
  // 보통 상세 정보에는 객체 형태로 author가 들어옵니다.
  const authorName = (lp as any).author?.nickname || (lp as any).author?.name || `User #${lp.authorId}`;

  return (
    <Link
      to={`/lp/${lp.id}`}
      className="group relative block overflow-hidden rounded-2xl bg-[#001a2c]/50 border border-blue-900/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:border-blue-500/50"
    >
      {/* 이미지 영역: 턴테이블 느낌의 원형 레이아웃 */}
      <div className="aspect-square w-full overflow-hidden bg-[#000d1a] relative">
        {lp.thumbnail ? (
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-1/3 w-1/3 rounded-full border-4 border-blue-900/20 bg-blue-950/30" />
          </div>
        )}
        
        {/* 호버 시 나타나는 딥 블루 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
      </div>

      {/* 정보 영역 */}
      <div className="flex flex-col gap-1.5 p-5">
        {/* 제목: 딥 블루 테마에 맞춰 포인트 컬러 변경 */}
        <h3 className="truncate text-base font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
          {lp.title || "Untitled Record"}
        </h3>

        <div className="flex items-center justify-between mt-1">
          {/* 작성자: undefined 방지를 위해 처리된 이름 출력 */}
          <span className="text-[11px] font-medium tracking-wider text-blue-900 uppercase group-hover:text-blue-500 transition-colors">
            {authorName}
          </span>
          
          {/* 좋아요 수 */}
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-800 group-hover:text-blue-400 transition-colors">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="transition-transform group-hover:scale-110"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>{lp.likeCount ?? 0}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}