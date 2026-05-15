import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-[#111111] px-6 py-5">
      <h1 className="text-4xl font-extrabold text-pink-500">
        돌려돌려LP판
      </h1>

      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="rounded-md bg-black px-5 py-2 text-lg font-semibold text-white hover:bg-gray-600 transition-colors"
        >
          로그인
        </Link>

        <Link
          to="/signup"
          className="rounded-md bg-pink-500 px-5 py-2 text-lg font-semibold text-white hover:bg-pink-700 transition-colors"
        >
          회원가입
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;