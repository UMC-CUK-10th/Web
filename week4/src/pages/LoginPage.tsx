// src/pages/LoginPage.tsx
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";

export const LoginPage = () => {
    const navigate = useNavigate();

    const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(values);
    
    };

    const isDisabled =
        Object.values(errors || {}).some(error => !!error) ||
        Object.values(values).some(value => value === "");

    return (
    <div className="flex min-h-full w-full items-center justify-center bg-transparent text-gray-900">
            <div className="w-full max-w-sm space-y-6 rounded-[28px] bg-white/75 p-8 text-rose-950 shadow-xl ring-1 ring-rose-200 backdrop-blur">
                <div className="relative flex items-center justify-center mb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute left-0 rounded-full p-2 transition-colors hover:bg-rose-100"
                        aria-label="뒤로 가기"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <h1 className="text-2xl font-bold text-rose-950">로그인</h1>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <input
                            {...getInputProps("email")}
                            className={`w-full rounded-xl border bg-white/80 p-3 text-rose-950 placeholder:text-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400
                                ${errors?.email && touched?.email ? "border-red-400" : "border-rose-200"}`}
                            type="email"
                            placeholder="이메일을 입력해주세요"
                        />
                        {errors?.email && touched?.email && (
                            <div className="mt-1 text-sm text-red-500">{errors.email}</div>
                        )}
                    </div>

                    <div>
                        <input
                            {...getInputProps("password")}
                            className={`w-full rounded-xl border bg-white/80 p-3 text-rose-950 placeholder:text-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400
                                ${errors?.password && touched?.password ? "border-red-400" : "border-rose-200"}`}
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                        />
                        {errors?.password && touched?.password && (
                            <div className="mt-1 text-sm text-red-500">{errors.password}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isDisabled}
                        className="mt-4 w-full rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 py-3 font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        로그인
                    </button>
                </form>
            </div>
        </div>
    )
}
