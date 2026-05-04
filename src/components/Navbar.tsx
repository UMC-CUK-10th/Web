const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-[#111111] px-6 py-5">
      <h1 className="text-4xl font-extrabold text-pink-500">
        LP판을왜돌려요
      </h1>

      <div className="flex items-center gap-3">
        <button className="rounded-md bg-black px-5 py-2 text-lg font-semibold text-white cursor-pointer hover:bg-gray-600 transition-colors">
          로그인
        </button>
        <button className="rounded-md bg-pink-500 px-5 py-2 text-lg font-semibold text-white cursor-pointer hover:bg-pink-700 transition-colors">
          회원가입
        </button>
      </div>
    </nav>
  );
};

export default Navbar;