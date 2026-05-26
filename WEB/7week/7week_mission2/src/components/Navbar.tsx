import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLogout } from "../hooks/mutations/useLogout";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const { accessToken } = useAuth(); // isLoggedIn 대신 accessToken 유무를 직접 확인하는 것이 안전합니다.
  const { mutate: logout } = useLogout();

  // 토큰이 있을 때만 내 정보를 가져오도록 설정 (옵셔널 체이닝 보강)
  const { data: myInfo } = useGetMyInfo();

  // 백엔드 응답 구조가 data.data.name인지 data.name인지 확인이 필요합니다.
  // 보통 TanStack Query 결과의 data는 axios의 response.data이므로 아래와 같이 접근합니다.
  const userName = myInfo?.data?.nickname || myInfo?.data?.name || myInfo?.name || "회원";

  return (
    // 배경을 딥 블루 그라데이션의 시작점인 #000d1a로 맞춤
    <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-blue-900/30 bg-[#000d1a] px-6 shadow-lg">
      <div className="flex items-center gap-6">
        <button
          onClick={toggleSidebar}
          className="text-blue-500 transition-colors hover:text-blue-300"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M7.95 11.95h32m-32 12h32m-32 12h32"
            />
          </svg>
        </button>
        <Link
          to="/"
          className="flex items-center gap-1 text-[22px] font-black uppercase tracking-[0.18em]"
        >
          <span className="text-blue-500">GGULBEOM</span>
          <span className="text-stone-100">CORD</span>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 text-sm font-medium text-blue-900 transition-colors hover:text-blue-400">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>

        {/* accessToken이 있을 때 유저 정보를 보여줍니다. */}
        {accessToken ? (
          <div className="flex items-center gap-4 text-sm">
            <span className="text-blue-100/70">
              <strong className="text-blue-400">{userName}</strong>님 반갑습니다.
            </span>
            <button
              onClick={() => logout()}
              className="text-blue-700 transition-colors hover:text-blue-400"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link
              to="/login"
              className="text-blue-100/60 transition-colors hover:text-white"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              // 회원가입 버튼도 딥 블루 포인트인 파란색으로 변경
              className="rounded-md bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-500 shadow-md shadow-blue-900/20"
            >
              회원가입
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}