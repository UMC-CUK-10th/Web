import { Heart } from "lucide-react";
import type { LpItem } from "../types/LpItem";
import { Link } from "react-router-dom";

interface LpCardProps {
    lp: LpItem

}

export default function LpCard({ lp }: LpCardProps) {
    return (
        <Link to={`/lp/${lp.id}`} key={lp.id} className="group relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 shadow-sm border border-gray-100">
            {/* 1. 기본 이미지 */}
            <img
                src={lp.thumbnail}
                alt={lp.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* 2. 호버 시 나타나는 정보 레이어 (Overlay) */}
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">

                {/* 제목 */}
                <h2 className="text-white font-bold text-lg mb-2 line-clamp-2">
                    {lp.title}
                </h2>

                {/* 구분선 */}
                <div className="w-full h-[1px] bg-white/20 mb-3" />

                {/* 하단 정보 (날짜 & 좋아요) */}
                <div className="flex justify-between items-center text-white/90">
                    <div className="flex flex-col text-[10px]">
                        <span className="text-white/60">UPLOADED</span>
                        <span className="font-medium">
                            {new Date(lp.createdAt).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        <Heart size={14} className="text-rose-400" fill="currentColor" />
                        <span className="text-xs font-bold">
                            {lp.likes?.length || 0}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}