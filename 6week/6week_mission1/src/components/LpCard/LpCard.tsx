import { useNavigate } from "react-router-dom";

interface LpCardProps {
  lp: any;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

    if (!token) {
      alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
      return;
    }

    navigate(`/lp/${lp.id}`);
  };

  // 🎯 날짜 포맷 통일 (LpDetailPage와 동일한 형식)
  const formattedDate = new Date(lp.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric", 
    month: "long", 
    day: "numeric",
  });

  return (
    <div 
      onClick={handleCardClick} 
      // group 클래스를 추가해야 자식 요소들이 hover 상태를 감지할 수 있습니다.
      className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white aspect-[4/3] hover:scale-105 hover:z-10"
    >
      {/* 🐈 이미지 영역 */}
      {lp.thumbnail ? (
        <img 
          src={lp.thumbnail} 
          alt={lp.title} 
          className="w-full h-full object-cover" 
        />
      ) : (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
          이미지 없음
        </div>
      )}

      {/* 🎯 Hover 시에만 나타나는 오버레이 영역 (제목, 날짜, 좋아요)
          opacity-0 -> group-hover:opacity-100 로 부드럽게 나타나게 설정했습니다.
      */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        
        {/* ❤️ 우측 상단 좋아요(하트 이모지) */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full text-white text-xs">
          <span>❤️</span>
          <span className="font-medium">{lp.likes?.length || 0}</span>
        </div>

        {/* 하단 메타 정보 (제목 및 날짜) */}
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-bold text-lg text-white truncate">{lp.title}</h3>
          <div className="flex justify-between items-center mt-1">
            <span className="text-gray-300 text-xs">{formattedDate}</span>
            <span className="text-white text-[10px] border border-white/30 px-1.5 py-0.5 rounded">
              자세히 보기
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LpCard;