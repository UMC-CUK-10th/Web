import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handelLogout = async () => {
    try {
      await axios.post("http://localhost:8000/v1/auth/signout");
      alert("로그아웃 성공");
    } catch (err) {
      console.error("로그아웃 중 에러 발생", err);
    } finally {
      localStorage.removeItem("accessToken");
      setUser(null);
      navigate("/login");
    }
  }
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 shadow-sm">
      {/* 로고 영역 */}
      <div className="text-2xl font-bold text-blue-600">
        <Link to="/">🐹</Link>
      </div>

      {/* 메뉴 링크 영역 */}
      <div className="flex gap-6 items-center">
        {user ? <span
          className="text-gray-600 hover:text-red-600 font-bold transition-colors cursor-pointer"
          onClick={() => handelLogout()}
        >로그아웃</span> :
          <Link
            to="/signup"
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors cursor-pointer"
          >
            회원가입
          </Link>
        }
        {user ? <Link
          to="/profile"
          className="text-gray-600 hover:text-blue-600 font-bold transition-colors"
        >
          {user.name}
        </Link> :
          <Link
            to="/login"
            className="px-5 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all shadow-md active:scale-95"
          >
            로그인
          </Link>
        }
      </div>
    </nav>
  );
}