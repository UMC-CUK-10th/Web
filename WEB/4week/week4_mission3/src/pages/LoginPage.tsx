import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import { useForm } from "../hooks/useForm";
import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    try {
      const response = await postSignin(values);
      setItem(response.data.accessToken);
      
      alert("로그인이 완료되었습니다! 🌲");
      navigate("/");
      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message ?? "로그인에 실패했습니다.");
        return;
      }
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <main className="min-h-[calc(100dvh-72px)] bg-[#041a13] px-6 text-white font-sans">
      <div className="mx-auto flex min-h-[calc(100dvh-72px)] w-full max-w-screen-xl items-center justify-center">
        <div className="w-full max-w-[360px]">
          
          {/* Header 🐾 */}
          <div className="relative mb-12 flex items-center justify-center">
            <Link
              to="/"
              className="absolute left-0 flex h-10 w-10 items-center justify-center text-[28px] leading-none text-emerald-400 transition-all hover:text-emerald-300 hover:scale-110"
            >
              ‹
            </Link>
            <h1 className="text-[22px] font-black tracking-tight text-white">로그인</h1>
          </div>

          <div className="flex flex-col gap-6">
            {/* Social Login 🔘 */}
            <button
              type="button"
              className="flex h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-emerald-500/30 bg-white/5 text-[15px] font-semibold text-emerald-50 transition-all hover:bg-emerald-500/10 hover:border-emerald-500/50"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="h-5 w-5"
              />
              <span>구글로 계속하기</span>
            </button>

            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-emerald-900/50" />
              <span className="text-[12px] font-bold text-emerald-800 uppercase tracking-widest">OR</span>
              <div className="h-px flex-1 bg-emerald-900/50" />
            </div>

            {/* Input Fields 🌲 */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-emerald-500/70 ml-1 uppercase tracking-wider">Email</label>
                <input
                  {...getInputProps("email")}
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  className={`h-[48px] w-full rounded-xl border bg-black/20 px-4 text-[14px] text-white placeholder:text-emerald-900/50 transition-all focus:outline-none ${
                    errors?.email && touched?.email
                      ? "border-red-500/50 focus:border-red-500"
                      : "border-emerald-900/50 focus:border-emerald-400"
                  }`}
                />
                {errors?.email && touched?.email && (
                  <p className="text-[11px] font-medium text-red-400 ml-1">{errors.email}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-emerald-500/70 ml-1 uppercase tracking-wider">Password</label>
                <input
                  {...getInputProps("password")}
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  className={`h-[48px] w-full rounded-xl border bg-black/20 px-4 text-[14px] text-white placeholder:text-emerald-900/50 transition-all focus:outline-none ${
                    errors?.password && touched?.password
                      ? "border-red-500/50 focus:border-red-500"
                      : "border-emerald-900/50 focus:border-emerald-400"
                  }`}
                />
                {errors?.password && touched?.password && (
                  <p className="text-[11px] font-medium text-red-400 ml-1">{errors.password}</p>
                )}
              </div>

              {/* Login Button 🍯 */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isDisabled}
                className="mt-4 h-[52px] w-full rounded-xl bg-emerald-600 text-[15px] font-bold text-white transition-all hover:bg-emerald-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-emerald-900/30 disabled:text-emerald-100/20 shadow-lg shadow-emerald-950/40"
              >
                로그인
              </button>

              <p className="text-center text-sm text-emerald-100/40 mt-2">
                계정이 없으신가요? <Link to="/signup" className="text-emerald-400 font-bold hover:underline">회원가입</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;