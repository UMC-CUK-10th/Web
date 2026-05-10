import type { LpItem } from '../hooks/queries/useGetLpList';

interface LpCardProps {
  lp: LpItem;
}

const LpCard = ({ lp }: LpCardProps) => {
  const thumbnailUrl = lp.thumbnail?.trim()
    ? lp.thumbnail.startsWith('http') || lp.thumbnail.startsWith('data:')
      ? lp.thumbnail
      : `${import.meta.env.VITE_SERVER_API_URL}${lp.thumbnail}`
    : "";

  return (
    <div className="overflow-hidden rounded-2xl bg-zinc-950 shadow-lg group cursor-pointer transition-transform duration-200 hover:-translate-y-1">
      {thumbnailUrl ? (
        <div className="aspect-square overflow-hidden bg-zinc-900">
          <img
            src={thumbnailUrl}
            alt={lp.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/500?text=No+Image";
            }}
          />
        </div>
      ) : (
        <div className="aspect-square flex items-center justify-center bg-zinc-800 text-sm text-gray-300">
          이미지 없음
        </div>
      )}

      <div className="px-3 py-3 bg-white text-black">
        <h3 className="text-sm font-semibold truncate">{lp.title}</h3>
      </div>
    </div>
  );
};

export default LpCard;