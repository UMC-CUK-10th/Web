import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth";

// --- Zod Schema ---
const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
    password: z
      .string()
      .min(6, { message: "비밀번호는 6자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z
      .string()
      .min(6, { message: "비밀번호는 6자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;
type SignupStep = "email" | "password" | "profile";

const EyeOpenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12C3.8 8.9 7.4 6.5 12 6.5C16.6 6.5 20.2 8.9 22 12C20.2 15.1 16.6 17.5 12 17.5C7.4 17.5 3.8 15.1 2 12Z" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3L21 21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M10.6 6.7C11.05 6.57 11.52 6.5 12 6.5C16.6 6.5 20.2 8.9 22 12C21.17 13.43 20.02 14.66 18.63 15.58" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M14.82 14.91C14.06 15.53 13.08 15.9 12 15.9C9.57 15.9 7.6 13.93 7.6 11.5C7.6 10.42 7.97 9.44 8.59 8.68" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M12 9.1C13.33 9.1 14.4 10.17 14.4 11.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[16px] w-[16px]" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75Zm1.96-.25L12 11.26l7.04-4.76H4.96Zm14.54 1.81-6.94 4.69a1 1 0 0 1-1.12 0L4.5 8.31v8.94c0 .14.11.25.25.25h14.5a.25.25 0 0 0 .25-.25V8.31Z" />
  </svg>
);

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<SignupStep>("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<FormFields>({
    defaultValues: { name: "", email: "", password: "", passwordCheck: "" },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const values = watch();

  // --- Step Validation Logic (동일) ---
  const isEmailStepValid = values.email.trim() !== "" && !errors.email;
  const isPasswordStepValid = values.password.trim() !== "" && values.passwordCheck.trim() !== "" && !errors.password && !errors.passwordCheck;
  const isProfileStepValid = values.name.trim() !== "" && !errors.name;

  // --- Styled Class Names (Deep Green) 🌲 ---
  const inputClassName = (hasError: boolean) =>
    `h-[48px] w-full rounded-xl border bg-black/20 px-4 text-[14px] text-white placeholder:text-emerald-900/50 transition-all focus:outline-none ${
      hasError ? "border-red-500/50" : "border-emerald-900/50 focus:border-emerald-400"
    }`;

  const buttonClassName =
    "mt-4 h-[52px] w-full rounded-xl bg-emerald-600 text-[15px] font-bold text-white transition-all hover:bg-emerald-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-emerald-900/30 disabled:text-emerald-100/20 shadow-lg shadow-emerald-950/40";

  const handleEmailNext = async () => {
    if (await trigger("email")) setStep("password");
  };

  const handlePasswordNext = async () => {
    if (await trigger(["password", "passwordCheck"])) setStep("profile");
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      setSubmitError("");
      const { passwordCheck, ...rest } = data;
      await postSignup(rest);
      navigate("/");
    } catch (error) {
      setSubmitError("회원가입 처리 중 오류가 발생했습니다.");
    }
  };

  // --- Render Helpers ---
  const renderPasswordField = (field: "password" | "passwordCheck", placeholder: string, visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>) => {
    const hasError = !!errors[field] && (touchedFields[field] || values[field] !== "");
    return (
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-emerald-500/70 ml-1 uppercase tracking-wider">{field}</label>
        <div className={`flex h-[48px] w-full rounded-xl border bg-black/20 text-white transition-all ${hasError ? "border-red-500/50" : "border-emerald-900/50 focus-within:border-emerald-400"}`}>
          <input {...register(field)} type={visible ? "text" : "password"} placeholder={placeholder} className="h-full flex-1 bg-transparent px-4 text-[14px] text-white placeholder:text-emerald-900/50 focus:outline-none" />
          <button type="button" onClick={() => setVisible(!visible)} className="flex h-full w-12 items-center justify-center text-emerald-700 hover:text-emerald-400 transition-colors">
            {visible ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </button>
        </div>
        {hasError && <p className="text-[11px] font-medium text-red-400 ml-1">{errors[field]?.message}</p>}
      </div>
    );
  };

  return (
    <main className="min-h-[calc(100dvh-72px)] bg-[#041a13] px-6 text-white font-sans">
      <div className="mx-auto flex min-h-[calc(100dvh-72px)] w-full max-w-screen-xl items-center justify-center">
        <div className="w-full max-w-[360px]">
          {/* Header 🌲 */}
          <div className="relative mb-12 flex items-center justify-center">
            <button
              type="button"
              onClick={() => {
                if (step === "password") return setStep("email");
                if (step === "profile") return setStep("password");
                navigate(-1);
              }}
              className="absolute left-0 flex h-10 w-10 items-center justify-center text-[28px] leading-none text-emerald-400 transition-all hover:text-emerald-300 hover:scale-110"
            >
              ‹
            </button>
            <h1 className="text-[22px] font-black tracking-tight text-white">회원가입</h1>
          </div>

          <div className="flex flex-col gap-6">
            {/* Step 1: Email 🍯 */}
            {step === "email" && (
              <>
                <button type="button" className="flex h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-emerald-500/30 bg-white/5 text-[15px] font-semibold text-emerald-50 transition-all hover:bg-emerald-500/10 hover:border-emerald-500/50">
                   <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5 w-5" />
                   <span>구글로 계속하기</span>
                </button>
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-emerald-900/50" />
                  <span className="text-[12px] font-bold text-emerald-800 uppercase tracking-widest">OR</span>
                  <div className="h-px flex-1 bg-emerald-900/50" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-emerald-500/70 ml-1 uppercase tracking-wider">Email</label>
                  <input {...register("email")} type="email" placeholder="이메일을 입력해주세요" className={inputClassName(!!errors.email && (touchedFields.email || values.email !== ""))} />
                  {errors.email && (touchedFields.email || values.email !== "") && <p className="text-[11px] font-medium text-red-400 ml-1">{errors.email.message}</p>}
                </div>
                <button type="button" onClick={handleEmailNext} disabled={!isEmailStepValid || isSubmitting} className={buttonClassName}>다음 단계로</button>
              </>
            )}

            {/* Step 2: Password 🍯 */}
            {step === "password" && (
              <>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-950/40 border border-emerald-900/30 text-emerald-400">
                  <MailIcon /> <span className="text-sm font-semibold truncate">{values.email}</span>
                </div>
                {renderPasswordField("password", "비밀번호 (6~20자)", showPassword, setShowPassword)}
                {renderPasswordField("passwordCheck", "비밀번호 확인", showPasswordCheck, setShowPasswordCheck)}
                <button type="button" onClick={handlePasswordNext} disabled={!isPasswordStepValid || isSubmitting} className={buttonClassName}>프로필 설정으로</button>
              </>
            )}

            {/* Step 3: Profile 🍯 */}
            {step === "profile" && (
              <>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-950/40 border border-emerald-900/30 text-emerald-400 mb-2">
                  <MailIcon /> <span className="text-sm font-semibold truncate">{values.email}</span>
                </div>
                <div className="flex justify-center py-4">
                  <div className="relative h-28 w-28 rounded-full bg-emerald-900/20 border-2 border-emerald-500/30 flex items-center justify-center overflow-hidden group transition-all hover:border-emerald-500">
                    <span className="text-4xl group-hover:scale-110 transition-transform">👤</span>
                    <div className="absolute inset-0 bg-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-emerald-500/70 ml-1 uppercase tracking-wider">Name</label>
                  <input {...register("name")} type="text" placeholder="이름을 입력해주세요" className={inputClassName(!!errors.name && (touchedFields.name || values.name !== ""))} />
                  {errors.name && (touchedFields.name || values.name !== "") && <p className="text-[11px] font-medium text-red-400 ml-1">{errors.name.message}</p>}
                </div>
                {submitError && <p className="text-xs text-red-400 text-center font-bold">{submitError}</p>}
                <button type="button" onClick={handleSubmit(onSubmit)} disabled={!isProfileStepValid || isSubmitting} className={buttonClassName}>
                  {isSubmitting ? "꿀범이 등록 중..." : "회원가입 완료 🐾"}
                </button>
              </>
            )}
          </div>

          {step === "email" && (
            <div className="mt-8 text-center">
              <Link to="/login" className="text-sm text-emerald-100/40 transition-colors hover:text-emerald-400 font-medium">
                이미 계정이 있나요? <span className="font-bold underline">로그인</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SignupPage;