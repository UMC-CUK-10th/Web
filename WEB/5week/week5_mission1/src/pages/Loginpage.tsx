import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { type UserSigninInformation, validateSignin } from "../utils/validate";

const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [navigate, accessToken]);

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(values);
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    /* 중앙 배치를 위한 레이아웃: h-screen 또는 min-h-[80vh] 사용 */
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-transparent px-4">
      <div className="w-full max-w-[400px] bg-white p-10 rounded-[32px] shadow-2xl shadow-emerald-900/5 border border-emerald-50 animate-in fade-in zoom-in duration-500">
        
        {/* 상단 꿀범 아이콘 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-50 rounded-2xl mb-4 border border-emerald-100">
            <span className="text-3xl">🍯</span>
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">로그인</h1>
          <p className="text-slate-400 mt-2 text-sm font-medium">재범님의 성장을 응원합니다!</p>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
          <div className="flex flex-col gap-1">
            <input
              {...getInputProps("email")}
              type="email"
              placeholder="이메일을 입력하세요"
              className={`w-full p-4 rounded-2xl bg-slate-50 border transition-all outline-none text-sm
                ${errors?.email && touched?.email 
                  ? "border-red-300 focus:border-red-400" 
                  : "border-slate-100 focus:border-emerald-500 focus:bg-white shadow-sm"
                }`}
            />
            {errors?.email && touched?.email && (
              <span className="text-xs text-red-500 ml-2 mt-1">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <input
              {...getInputProps("password")}
              type="password"
              placeholder="비밀번호를 입력하세요"
              className={`w-full p-4 rounded-2xl bg-slate-50 border transition-all outline-none text-sm
                ${errors?.password && touched?.password 
                  ? "border-red-300 focus:border-red-400" 
                  : "border-slate-100 focus:border-emerald-500 focus:bg-white shadow-sm"
                }`}
            />
            {errors?.password && touched?.password && (
              <span className="text-xs text-red-500 ml-2 mt-1">{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full py-4 rounded-2xl text-white font-bold transition-all shadow-lg mt-2 text-sm
              ${isDisabled 
                ? "bg-slate-200 cursor-not-allowed" 
                : "bg-emerald-600 hover:bg-emerald-700 hover:scale-[1.01] active:scale-95 shadow-emerald-600/20"
              }`}
          >
            로그인하기
          </button>
        </form>

        {/* 하단 푸터 링크 */}
        <div className="mt-8 text-center text-sm border-t border-slate-50 pt-6">
          <span className="text-slate-400">아직 회원이 아니신가요? </span>
          <Link to="/signup" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;