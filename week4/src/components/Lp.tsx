import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import type { Lp } from "../types/lp";

interface LpCardProps {
  lp: Lp;
}

export default function LpCard({ lp }: LpCardProps) {
  return (
    <Link
      to={`/lp/${lp.id}`}
      className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 flex flex-col justify-end bg-black/55 p-5 opacity-0 transition-all duration-300 group-hover:opacity-100">
        <h2 className="mb-2 line-clamp-2 text-base font-bold text-white">
          {lp.title}
        </h2>

        <div className="mb-3 h-px w-full bg-white/20" />

        <div className="flex items-center justify-between text-white">
          <div className="flex flex-col text-[10px]">
            <span className="text-white/60">UPLOADED</span>
            <span className="font-medium">
              {new Date(lp.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5">
            <Heart size={14} className="text-pink-400" fill="currentColor" />
            <span className="text-xs font-bold">{lp.likes?.length ?? 0}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}