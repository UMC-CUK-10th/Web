import type { Lp } from "../../types/Lp"
import { useNavigate } from "react-router-dom";

interface LpCardProps {
    lp: Lp
}

export default function LpCard({ lp }: LpCardProps) {
    const navigate = useNavigate();

    const handleLpClick = (id: number) => {
        navigate(`/lps/${id}`);
    }
    
    return (
        <div className="
            flex flex-col gap-2 rounded-xl overflow-hidden
            shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => handleLpClick(lp.id)}
        >
            <img src={lp.thumbnail} alt={lp.title} width={120} 
                className="w-full aspect-square object-cover"
            />
            <div className="p-2">
                <p className="font-semibold text-sm truncate">{lp.title}</p>
                <p className="text-xs text-gray-400 truncate">{lp.content}</p>
                <p className="text-xs text-gray-400 truncate">❤️ {lp.likes.length}</p>
            </div>
        </div>
    )
}