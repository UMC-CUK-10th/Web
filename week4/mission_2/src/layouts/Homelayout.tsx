import { Outlet, Link } from 'react-router-dom';

const Homelayout = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* 네비게이션 */}
      <nav className="bg-gray-100 p-4 flex justify-between items-center">
        <div className="text-xl font-bold">MyWebsite</div>
        <div className="flex gap-4">
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            홈
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            로그인
          </Link>
          <Link
            to="/Sinup"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            회원가입
          </Link>
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