import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { UserSignInformation } from "../utils/validate.ts"; 
import { validateSignin } from "../utils/validate.ts";
import useForm from "../hooks/useForm.ts";
import { useAuth } from "../context/AuthContext.tsx";

const EyeIcon = ({ ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

const EyeSlashIcon = ({ ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.243 4.243L6.228 6.228" />
    </svg>
);

const LoginPage = () => {
    const { login, accessToken } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (accessToken) {
            navigate("/my");
        }
    }, [accessToken, navigate]);

  const { getInputProps, errors, touched, values } = useForm<UserSignInformation>({
    initialValues: { email: "", password: "" }, 
    validate: validateSignin,
});

    const handleSubmit = async () => {
        await login(values);
    };

    const handleGoogleLogin = () => {
        const serverUrl = import.meta.env.VITE_SERVER_API_URL || "http://localhost:8000";
        window.location.href = `${serverUrl}/v1/auth/google/login`;
    };

    const isInvalid = Object.values(errors).some(error => !!error) || Object.values(values).some(v => !v);

    return (
        <div className="flex flex-col items-center justify-center min-h-[85vh] gap-4 px-4">
            <h1 className="text-3xl font-black tracking-tighter text-slate-900">로그인</h1>
            
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col gap-3 w-full max-w-[340px]">
                {/* 이메일 입력창 */}
                <div className="flex flex-col gap-1">
                    <input
                        {...getInputProps('email')}
                        type="email"
                        placeholder="이메일을 입력하세요"
                        className={`w-full p-3 rounded-xl border outline-none transition-all text-sm
                            ${errors.email && touched.email 
                                ? "border-red-400 bg-red-50" 
                                : "border-slate-200 focus:border-emerald-500 shadow-sm"}`}
                    />
                    {errors.email && touched.email && <span className="text-xs text-red-500 ml-1">{errors.email}</span>}
                </div>

                {/* 비밀번호 입력창 */}
                <div className="flex flex-col gap-1">
                    <div className="relative">
                        <input
                            {...getInputProps('password')}
                            type={showPassword ? "text" : "password"}
                            placeholder="비밀번호를 입력하세요"
                            className={`w-full p-3 rounded-xl border outline-none transition-all text-sm pr-10
                                ${errors.password && touched.password 
                                    ? "border-red-400 bg-red-50" 
                                    : "border-slate-200 focus:border-emerald-500 shadow-sm"}`}
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)} 
                            className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                    </div>
                    {errors.password && touched.password && <span className="text-xs text-red-500 ml-1">{errors.password}</span>}
                </div>

                {/* 일반 로그인 버튼 */}
                <button
                    type="submit"
                    disabled={isInvalid}
                    className={`w-full py-3 rounded-xl text-white font-bold transition-all mt-2
                        ${isInvalid 
                            ? "bg-slate-200 cursor-not-allowed" 
                            : "bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 active:scale-95"}`}
                >
                    로그인
                </button>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="group w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 active:scale-[0.98]"
              >
                {/* 구글 */}
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google logo"
                  className="w-5 h-5"
                />

                {/* 텍스트 */}
                <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                  Google로 로그인
                </span>
              </button>
            </form>

            <div className="mt-4 text-sm text-slate-400">
                계정이 없으신가요? <Link to="/signup" className="text-emerald-600 font-bold hover:underline">회원가입</Link>
            </div>
        </div>
    );
};

export default LoginPage;