import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { postSignup } from "../apis/auth";
import SignupInput from "../components/SignupInput";
import PasswordInput from "../components/PasswordInput";

const schema = z
  .object({
    email: z.email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
      .max(20, { message: "최대 20자까지 입력할 수 있습니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호 확인은 최소 8자 이상이어야 합니다." })
      .max(20, { message: "최대 20자까지 입력할 수 있습니다." }),
    name: z.string().min(1, { message: "닉네임을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const email = watch("email");

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest } = data;

    try {
      await postSignup(rest);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = async () => {
    if (step === 1) {
      const isValid = await trigger("email");
      if (isValid) setStep(2);
      return;
    }

    if (step === 2) {
      const isValid = await trigger(["password", "passwordCheck"]);
      if (isValid) setStep(3);
      return;
    }

    if (step === 3) {
      const isValid = await trigger("name");
      if (isValid) handleSubmit(onSubmit)();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <div className="relative w-[300px] flex items-center justify-center mb-2">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="absolute left-0 text-white text-3xl cursor-pointer"
            >
              ‹
            </button>
          )}

          <h1 className="text-white font-bold text-xl">회원가입</h1>
        </div>

        {step === 1 && (
          <SignupInput
            {...register("email")}
            type="email"
            placeholder="이메일"
            error={errors.email?.message}
          />
        )}

        {step === 2 && (
          <>
            <div className="w-[300px] text-white text-sm">✉️ {email}</div>

            <PasswordInput
              {...register("password")}
              placeholder="비밀번호를 입력해주세요!"
              error={errors.password?.message}
            />

            <PasswordInput
              {...register("passwordCheck")}
              placeholder="비밀번호를 다시 한 번 입력해주세요!"
              error={errors.passwordCheck?.message}
            />
          </>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center gap-6">
            <div className="w-[160px] h-[160px] rounded-full bg-gray-200" />

            <SignupInput
              {...register("name")}
              type="text"
              placeholder="닉네임"
              error={errors.name?.message}
            />
          </div>
        )}

        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleNext}
          className="w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          {step === 3 ? "회원가입 완료" : "다음"}
        </button>
      </div>
    </div>
  );
};

export default SignupPage;