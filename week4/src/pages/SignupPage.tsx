import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { postSignup } from "../apis/auth.ts";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z.string(),
    name: z.string().min(1, { message: "닉네임을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
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

  const emailValue = watch("email");
  const passwordValue = watch("password");
  const passwordCheckValue = watch("passwordCheck");
  const nameValue = watch("name");

  useEffect(() => {
    const validateEmail = async () => {
      const valid = await trigger("email");
      setIsEmailValid(valid);
    };
    validateEmail();
  }, [emailValue, trigger]);

  useEffect(() => {
    const validatePassword = async () => {
      const valid = await trigger(["password", "passwordCheck"]);
      setIsPasswordValid(valid);
    };
    validatePassword();
  }, [passwordValue, passwordCheckValue, trigger]);

  useEffect(() => {
    const validateName = async () => {
      const valid = await trigger("name");
      setIsNameValid(valid);
    };
    validateName();
  }, [nameValue, trigger]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest } = data;
    try {
      const response = await postSignup(rest);
      console.log(response);
      alert("회원가입이 완료되었습니다.");
      navigate("/");
    } catch (error) {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleNext = async () => {
    if (step === 1 && isEmailValid) setStep(2);
    else if (step === 2 && isPasswordValid) setStep(3);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-800">
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

      <main className="flex min-h-screen items-center justify-center px-6 pt-16">
        <section className="w-full max-w-[420px] rounded-2xl border border-gray-200 bg-white px-8 py-10 shadow-sm">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50"
          >
            <FaArrowLeft size={14} />
          </button>

          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">회원가입</h2>
            <p className="mt-2 text-sm text-gray-500">
              계정을 만들고 서비스를 시작해보세요
            </p>
          </div>

          <div className="mb-6 flex items-center justify-center gap-2">
            <div
              className={`h-2 w-16 rounded-full ${
                step >= 1 ? "bg-pink-500" : "bg-gray-200"
              }`}
            />
            <div
              className={`h-2 w-16 rounded-full ${
                step >= 2 ? "bg-pink-500" : "bg-gray-200"
              }`}
            />
            <div
              className={`h-2 w-16 rounded-full ${
                step >= 3 ? "bg-pink-500" : "bg-gray-200"
              }`}
            />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
            noValidate
          >
            {step === 1 && (
              <>
                <input
                  {...register("email")}
                  className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100 ${
                    errors?.email ? "border-red-500" : "border-gray-300"
                  }`}
                  type="email"
                  placeholder="이메일을 입력하세요"
                />
                {errors.email && (
                  <div className="text-red-500 text-sm">{errors.email.message}</div>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isEmailValid}
                  className={`mt-2 h-12 w-full rounded-xl text-sm font-semibold transition ${
                    !isEmailValid
                      ? "cursor-not-allowed bg-gray-200 text-gray-400"
                      : "bg-pink-500 text-white hover:bg-pink-600"
                  }`}
                >
                  다음
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="rounded-xl bg-pink-50 px-4 py-3 text-sm text-pink-500">
                  {emailValue}
                </div>

                <input
                  {...register("password")}
                  className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100 ${
                    errors?.password ? "border-red-500" : "border-gray-300"
                  }`}
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                />
                {errors.password && (
                  <div className="text-red-500 text-sm">{errors.password.message}</div>
                )}

                <input
                  {...register("passwordCheck")}
                  className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100 ${
                    errors?.passwordCheck ? "border-red-500" : "border-gray-300"
                  }`}
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                />
                {errors.passwordCheck && (
                  <div className="text-red-500 text-sm">
                    {errors.passwordCheck.message}
                  </div>
                )}

                <div className="mt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="h-12 flex-1 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    이전
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isPasswordValid}
                    className={`h-12 flex-1 rounded-xl text-sm font-semibold transition ${
                      !isPasswordValid
                        ? "cursor-not-allowed bg-gray-200 text-gray-400"
                        : "bg-pink-500 text-white hover:bg-pink-600"
                    }`}
                  >
                    다음
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="mb-2 flex flex-col items-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-pink-50 text-3xl">
                    👤
                  </div>
                </div>

                <input
                  {...register("name")}
                  className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100 ${
                    errors?.name ? "border-red-500" : "border-gray-300"
                  }`}
                  type="text"
                  placeholder="닉네임을 입력하세요"
                />
                {errors.name && (
                  <div className="text-red-500 text-sm">{errors.name.message}</div>
                )}

                <div className="mt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="h-12 flex-1 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    이전
                  </button>
                  <button
                    type="submit"
                    disabled={!isNameValid || isSubmitting}
                    className={`h-12 flex-1 rounded-xl text-sm font-semibold transition ${
                      !isNameValid || isSubmitting
                        ? "cursor-not-allowed bg-gray-200 text-gray-400"
                        : "bg-pink-500 text-white hover:bg-pink-600"
                    }`}
                  >
                    회원가입 완료
                  </button>
                </div>
              </>
            )}
          </form>
        </section>
      </main>
    </div>
  );
};

export default SignupPage;