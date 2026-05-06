import { type Lp } from "../../types/lp";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  return (
    <div className="
      relative rounded-lg overflow-hidden bg-gray-100 cursor-pointer
      border border-gray-200 dark:border-gray-700
      shadow-lg transition-all duration-300 ease-in-out
      hover:-translate-y-2 hover:scale-[1.05] hover:shadow-2xl
      
      group
    ">
      
      <div className="overflow-hidden h-48 w-full">
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="object-cover w-full h-full block transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-black/75 p-2">
        <h3 className="text-white text-sm font-semibold truncate">{lp.title}</h3>
      </div>

    </div>
  );
};

export default LpCard;