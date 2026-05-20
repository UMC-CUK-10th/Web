import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import LoadingSpinner from "./LoadingSpinner";

export default function Navbar() {
  const { user, loading, logout } = useUserContext();
  
  if (loading) return <LoadingSpinner title="유저 정보를 불러오고 있습니다"/>
  return (
    <>
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 shadow-sm">
        {/* 로고 영역 */}
        <div className="flex items-center gap-4 text-2axl font-bold text-blue-600">
          
          <Link to="/" className="text-center">김햄찌입니다</Link>
        </div>
        { user ? (
          <div className="flex gap-6 items-center">
            <button onClick={logout}>로그아웃</button>
            <Link to="/mypage">
              <span>{user.name}</span>
            </Link>
          </div>
        ) : (
          <div className="flex gap-6 items-center">
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </div>
        )}
        
      </nav>
    </>
  );
}