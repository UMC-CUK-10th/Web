import { Link } from "react-router-dom";
import type { Lp } from "../types/lp";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  return (
    <Link
      to={`/lp/${lp.id}`}
      className="group relative block overflow-hidden rounded-lg"
    >
      <img
        src={lp.thumbnail}
        alt="LP 이미지"
        className="aspect-square w-full rounded-lg object-cover transition-transform duration-200 group-hover:scale-110"
      />

      <div className="absolute inset-0 flex scale-110 flex-col justify-center rounded-lg bg-black/70 text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="font-bold text-lg mb-1">{lp.title}</h3>
        <p>{new Date(lp.createdAt).toLocaleDateString()}</p>
        <p>{lp.likes.length}</p>
      </div>
    </Link>
  );
};

export default LpCard;
