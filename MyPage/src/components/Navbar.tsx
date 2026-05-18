import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 shadow-sm">
      {/* 로고 영역 */}
      <div className="text-2xl font-bold text-blue-600">
        <Link to="/">🐹</Link>
      </div>

      {/* 메뉴 링크 영역 */}
      <div className="flex gap-6 items-center">
        <Link 
          to="/signup" 
          className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
        >
          회원가입
        </Link>
        <Link 
          to="/login" 
          className="px-5 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all shadow-md active:scale-95"
        >
          로그인
        </Link>
      </div>
    </nav>
  );
}