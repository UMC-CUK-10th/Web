import { Link } from "react-router-dom";
import type { Lp } from "../types/lp";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  return (
    <Link to={`/lp/${lp.id}`} key={lp.id} className="block relative group">
      <img
        src={lp.thumbnail}
        alt="LP 이미지"
        className="w-full aspect-square rounded-lg object-cover group-hover:scale-110
              transition-transform duration-200"
      />

      <div
        className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-400 inset-0
            flex flex-col justify-center text-center text-white bg-black/70 scale-110 rounded-lg"
      >
        <h3 className="font-bold text-lg mb-1">{lp.title}</h3>
        <p>{lp.createdAt.toLocaleDateString()}</p>
        <p>{lp.likes.length}</p>
      </div>
    </Link>
  );
};

export default LpCard;