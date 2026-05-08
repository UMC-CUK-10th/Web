import { useNavigate } from "react-router-dom";
import type { Lp } from "../../types/lp";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/lp/${lp.id}`)}
      className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <img
        src={lp.thumbnail}
        alt={`${lp.title} 이미지`}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/55 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="line-clamp-2 text-center text-base font-semibold">
          {lp.title}
        </h3>

        <p className="mt-2 text-xs text-white/80">
          {new Date(lp.updatedAt).toLocaleDateString()}
        </p>

        <p className="mt-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
          ♡ {lp.likes?.length ?? 0}
        </p>
      </div>
    </div>
  );
};

export default LpCard;