import { Link, NavLink, Outlet } from "react-router-dom";

const HomeLayout = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-rose-600" : "text-rose-900/70 hover:text-rose-700"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-orange-100 text-gray-900">
      <header className="border-b border-rose-200/70 bg-white/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-black tracking-tight text-rose-900">
            히히
          </Link>

          <div className="flex items-center gap-8">
            <nav className="hidden items-center gap-6 md:flex">
              <NavLink to="/" end className={navLinkClass}>
                홈
              </NavLink>
              <NavLink to="/login" className={navLinkClass}>
                로그인
              </NavLink>
              <NavLink to="/signup" className={navLinkClass}>
                회원가입
              </NavLink>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-full border border-rose-300 bg-white/80 px-4 py-2 text-sm font-semibold text-rose-700 transition-colors hover:border-rose-500 hover:text-rose-600"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-pink-600"
              >
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-6xl flex-1 px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
