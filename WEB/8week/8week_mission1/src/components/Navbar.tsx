import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLogout } from "../hooks/mutations/useLogout";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";

// 💡 파트장님의 인터페이스 규격을 수용하여 HomeLayout의 빨간 줄 에러를 해결합니다.
interface NavbarProps {
  toggleSidebar: () => void;
  isSearchOpen: boolean;
  onSearchToggle: () => void;
}

export default function Navbar({
  toggleSidebar,
  isSearchOpen,
  onSearchToggle,
}: NavbarProps) {
  const { accessToken } = useAuth(); 
  const { mutate: logout } = useLogout();
  const { data: myInfo } = useGetMyInfo();

  const userName = myInfo?.data?.nickname || myInfo?.data?.name || myInfo?.name || "회원";

  return (
    // 💡 기존 디자인 복구: 배경을 딥 블루 그라데이션의 시작점인 #000d1a로 유지
    <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-blue-900/30 bg-[#000d1a] px-6 shadow-lg">
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="사이드바 열기"
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
        
        {/* 💡 기존 디자인 복구: GGULBEOM CORD 아이덴티티 로고 */}
        <Link
          to="/"
          className="flex items-center gap-1 text-[22px] font-black uppercase tracking-[0.18em]"
        >
          <span className="text-blue-500">GGULBEOM</span>
          <span className="text-stone-100">CORD</span>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        {/* 💡 검색 상태(isSearchOpen)에 따라 돋보기와 닫기 아이콘이 유기적으로 바뀌도록 토글 버튼 활성화 */}
        <button
          type="button"
          onClick={onSearchToggle}
          aria-label={isSearchOpen ? "검색 닫기" : "검색 열기"}
          className="flex items-center gap-2 text-sm font-medium text-blue-900 transition-colors hover:text-blue-400"
        >
          {isSearchOpen ? (
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
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
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
          )}
        </button>

        {accessToken ? (
          <div className="flex items-center gap-4 text-sm">
            <span className="text-blue-100/70">
              <strong className="text-blue-400">{userName}</strong>님 반갑습니다.
            </span>
            <button
              type="button"
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