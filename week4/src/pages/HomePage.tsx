import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <nav className="fixed top-0 left-0 z-20 w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <h2
            className="cursor-pointer text-xl font-bold text-pink-500"
            onClick={() => navigate("/")}
          >
            lily web
          </h2>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              로그인
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-600"
            >
              회원가입
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pt-16">
        <section className="text-center">
          <p className="mb-3 text-2xl font-medium text-pink-500">Welcome</p>
          
        </section>

        <section className="mt-14 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">홈 화면</h3>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              첫 화면에서 서비스의 기본 정보를 간단하게 확인할 수 있습니다.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">로그인 화면</h3>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              이메일과 비밀번호를 입력하고 로그인할 수 있습니다.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">회원가입 화면</h3>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              회원 정보를 입력하고 새로운 계정을 생성할 수 있습니다.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;