import { Outlet, Link } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

const Homelayout = () => {
   const { user, setUser } = useAuth();

  const handleLogout = () => {
    setUser(null); 
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  };
  return (
    <div className="h-screen flex flex-col">
      {/* 네비게이션 */}
      <nav className="bg-gray-100 p-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">MyWebsite</Link>
        </div>
        <div className="flex gap-4">
          {!user ? (
            <>
              <Link to="/login"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >로그인</Link>
              <Link to="/signup"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >회원가입</Link>
            </>
          ) : (
            <>
              <span>{user.name}님</span>
              <Link to="/mypage">마이페이지</Link>
              <button onClick={handleLogout}>로그아웃</button>
            </>
          )}
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>

      {/* 푸터 */}
      <footer className="bg-gray-100 p-4 text-center">
        &copy; woohyun.website
      </footer>
    </div>
  );
};

export default Homelayout;
