import { postSignin } from "../apis/auth.ts";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import useForm from "../hooks/useForm";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { type UserSigninInformatin, validateSignin } from "../utils/validate";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const { values, error, touched, getInputProps } =
    useForm<UserSigninInformatin>({
      initialValue: { email: "", password: "" },
      validate: validateSignin,
    });

  const isDisabled =
    Object.values(error || {}).some((e) => e.length > 0) ||
    values.email === "" ||
    values.password === "";

  const handleSubmit = async () => {
    if (isDisabled) return;

    try {
      const response = await postSignin(values);
      setItem(response.data.accessToken);
      alert("로그인에 성공하였습니다.");
      navigate("/");
    } catch (error: any) {
      alert(`로그인에 실패했습니다: ${error?.message ?? "다시 시도해주세요."}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-800">
      <nav className="fixed top-0 left-0 z-20 w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <h2
            className="cursor-pointer text-2xl font-bold text-pink-500"
            onClick={() => navigate("/")}
          >
            lily web
          </h2>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="rounded-lg border border-pink-200 bg-pink-50 px-4 py-2 text-sm font-medium text-pink-500"
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

      <main className="flex min-h-screen items-center justify-center px-6 pt-16">
        <section className="w-full max-w-[420px] rounded-2xl border border-gray-200 bg-white px-8 py-10 shadow-sm">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50"
          >
            <FaArrowLeft size={14} />
          </button>

          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">로그인</h2>
            <p className="mt-2 text-sm text-gray-500">
              계정 정보를 입력하고 로그인하세요
            </p>
          </div>

          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <FcGoogle size={20} />
            구글 로그인
          </button>

          <div className="my-6 flex items-center">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="px-3 text-xs font-medium text-gray-400">OR</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="space-y-4">
            <div>
              <input
                {...getInputProps("email")}
                type="email"
                placeholder="이메일을 입력해주세요!"
                className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100 ${
                  error?.email && touched?.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {error?.email && touched?.email && (
                <p className="mt-2 text-xs text-red-500">{error.email}</p>
              )}
            </div>

            <div>
              <input
                {...getInputProps("password")}
                type="password"
                placeholder="비밀번호를 입력해주세요!"
                className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100 ${
                  error?.password && touched?.password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {error?.password && touched?.password && (
                <p className="mt-2 text-xs text-red-500">{error.password}</p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`mt-6 h-12 w-full rounded-xl text-sm font-semibold transition ${
              isDisabled
                ? "cursor-not-allowed bg-gray-200 text-gray-400"
                : "bg-pink-500 text-white hover:bg-pink-600"
            }`}
          >
            로그인
          </button>

          <p className="mt-6 text-center text-sm text-gray-500">
            아직 회원이 아니신가요?{" "}
            <span
              className="cursor-pointer font-semibold text-pink-500 hover:underline"
              onClick={() => navigate("/signup")}
            >
              회원가입
            </span>
          </p>
        </section>
      </main>
    </div>
  );
};

export default LoginPage;