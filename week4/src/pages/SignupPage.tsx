import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { postSignup } from "../apis/auth.ts";
import { useNavigate } from "react-router-dom";
import type { RequestSignupDto } from "../types/auth.ts";

const schema = z.object({
    email: z.string().email({message: "올바른 이메일 형식을 입력해주세요."}),
    password: z.string()
    .min(6, {message: "비밀번호는 6자 이상이어야 합니다.",
    }),
    passwordCheck: z.string()
    .min(6, {message: "비밀번호는 6자 이상이어야 합니다.",
    }),
    name: z.string().min(1, {message: "이름을 입력해주세요."}),
})
.refine((data)=> data.password === data.passwordCheck, {
        message: "비밀번호가 일치하지 않습니다.",
        path:["passwordCheck"],
    });

type FormFields = z.infer<typeof schema>;

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur", 
  });

  const emailValue = useWatch({ control, name: "email" });
  const passwordValue = useWatch({ control, name: "password" });
  const passwordCheckValue = useWatch({ control, name: "passwordCheck" });


  useEffect(() => {
    const validateEmail = async () => setIsEmailValid(await trigger("email"));
    validateEmail();
  }, [emailValue, trigger]);

  useEffect(() => {
    const validatePassword = async () => setIsPasswordValid(await trigger(["password", "passwordCheck"]));
    validatePassword();
  }, [passwordValue, passwordCheckValue, trigger]);




  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const signupData: RequestSignupDto = {
      email: data.email,
      password: data.password,
      name: data.name,
    };

    try {
      await postSignup(signupData);
      alert("회원가입이 완료되었습니다!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패했습니다.");
    }
  };

  const handleNext = () => {
    if (step === 1 && isEmailValid) setStep(2);
    else if (step === 2 && isPasswordValid) setStep(3);
  };


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
          <h1 className="text-2xl font-bold text-rose-950">회원가입</h1>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-rose-500">
          <span className={step >= 1 ? "text-rose-600" : "text-rose-300"}>01 이메일</span>
          <span className="text-rose-300">/</span>
          <span className={step >= 2 ? "text-rose-600" : "text-rose-300"}>02 비밀번호</span>
          <span className="text-rose-300">/</span>
          <span className={step >= 3 ? "text-rose-600" : "text-rose-300"}>03 이름</span>
        </div>

        {step === 1 && (
          <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleNext(); }}>
            <div>
              <input
                {...register("email")}
                className={`w-full rounded-xl border bg-white/80 p-3 text-rose-950 placeholder:text-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400
                  ${errors.email ? "border-red-400" : "border-rose-200"}`}
                type="email"
                placeholder="이메일을 입력해주세요"
              />
              {errors.email && (
                <div className="mt-1 text-sm text-red-500">{errors.email.message}</div>
              )}
            </div>
            <button
              type="submit"
              disabled={!isEmailValid}
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 py-3 font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              다음
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleNext(); }}>
            <div className="mb-2 rounded-xl bg-rose-100 px-4 py-3 text-center font-semibold text-rose-700">
              {emailValue}
            </div>
            <div className="relative">
              <input
                {...register("password")}
                className={`w-full rounded-xl border bg-white/80 p-3 pr-12 text-rose-950 placeholder:text-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400
                  ${errors.password ? "border-red-400" : "border-rose-200"}`}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-rose-500 transition-colors hover:bg-rose-100 hover:text-rose-700"
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </button>
              {errors.password && (
                <div className="mt-1 text-sm text-red-500">{errors.password.message}</div>
              )}
            </div>
            <div className="relative">
              <input
                {...register("passwordCheck")}
                className={`w-full rounded-xl border bg-white/80 p-3 pr-12 text-rose-950 placeholder:text-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400
                  ${errors.passwordCheck ? "border-red-400" : "border-rose-200"}`}
                type={showPasswordCheck ? "text" : "password"}
                placeholder="비밀번호 확인"
              />
              <button
                type="button"
                onClick={() => setShowPasswordCheck((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-rose-500 transition-colors hover:bg-rose-100 hover:text-rose-700"
                aria-label={showPasswordCheck ? "비밀번호 확인 숨기기" : "비밀번호 확인 보기"}
              >
                {showPasswordCheck ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </button>
              {errors.passwordCheck && (
                <div className="mt-1 text-sm text-red-500">{errors.passwordCheck.message}</div>
              )}
            </div>
            <button
              type="submit"
              disabled={!isPasswordValid}
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 py-3 font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              다음
            </button>
          </form>
        )}

        {step === 3 && (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 via-pink-400 to-orange-300 text-3xl font-black text-white shadow-md">
              {nameInitial(emailValue)}
            </div>
            <div>
              <input
                {...register("name")}
                className={`w-full rounded-xl border bg-white/80 p-3 text-rose-950 placeholder:text-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400
                  ${errors.name ? "border-red-400" : "border-rose-200"}`}
                type="text"
                placeholder="이름을 입력해주세요"
              />
              {errors.name && (
                <div className="mt-1 text-sm text-red-500">{errors.name.message}</div>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 py-3 font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              회원가입 완료
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const nameInitial = (email: string) => {
  const initial = email.trim().charAt(0);
  return initial ? initial.toUpperCase() : "?";
};

const EyeOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m3 3 18 18" />
    <path d="M10.584 10.587a2 2 0 1 0 2.829 2.829" />
    <path d="M9.363 5.365A9.466 9.466 0 0 1 12 5c4.478 0 8.268 2.943 9.543 7a9.776 9.776 0 0 1-1.563 3.029" />
    <path d="M6.71 6.709C4.722 8.118 3.244 9.97 2.457 12c1.275 4.057 5.065 7 9.543 7 1.503 0 2.93-.33 4.21-.92" />
  </svg>
);

export default SignUpPage;
