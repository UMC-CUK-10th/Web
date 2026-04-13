import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import axios from "axios";

const emailSchema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
});


const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하이어야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하이어야 합니다." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });


const nameSchema = z.object({
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
});


type EmailStep = z.infer<typeof emailSchema>;
type PasswordStep = z.infer<typeof passwordSchema>;
type NameStep = z.infer<typeof nameSchema>;


const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const emailForm = useForm<EmailStep>({
    defaultValues: { email: "" },
    resolver: zodResolver(emailSchema),
    mode: "onBlur",
  });

  const passwordForm = useForm<PasswordStep>({
    defaultValues: { password: "", passwordCheck: "" },
    resolver: zodResolver(passwordSchema),
    mode: "onBlur",
  });

  const nameForm = useForm<NameStep>({
    defaultValues: { name: "" },
    resolver: zodResolver(nameSchema),
    mode: "onBlur",
  });


  const handleNextStep = () => setStep((prev) => prev + 1);


  const handleSignup: SubmitHandler<NameStep> = async (nameData) => {
    try {
      const payload = {
        email: emailForm.getValues().email,
        password: passwordForm.getValues().password,
        name: nameData.name,
      };
      const response = await axios.post("http://localhost:8000/v1/auth/signup", payload);
      console.log(response.data);

      alert("회원가입 성공!");
      navigate("/", { replace: true });
    } catch (error: any) {
      const msg = error.response?.data?.message || "회원가입 실패";
      alert(msg);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      
      {step === 1 && (
        <form className="flex flex-col gap-3 w-[300px]" onSubmit={emailForm.handleSubmit(handleNextStep)}>
          <input
            {...emailForm.register("email")}
            type="email"
            placeholder="이메일"
            className={`border p-2 rounded-sm ${emailForm.formState.errors.email ? "border-red-500 bg-red-100" : "border-gray-300"}`}
          />
          {emailForm.formState.errors.email && (
            <div className="text-red-500 text-sm">{emailForm.formState.errors.email.message}</div>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md"
          >
            다음
          </button>
        </form>
      )}

      
      {step === 2 && (
        <form className="flex flex-col gap-3 w-[300px]" onSubmit={passwordForm.handleSubmit(handleNextStep)}>
          <input
            {...passwordForm.register("password")}
            type="password"
            placeholder="비밀번호"
            className={`border p-2 rounded-sm ${passwordForm.formState.errors.password ? "border-red-500 bg-red-100" : "border-gray-300"}`}
          />
          {passwordForm.formState.errors.password && (
            <div className="text-red-500 text-sm">{passwordForm.formState.errors.password.message}</div>
          )}

          <input
            {...passwordForm.register("passwordCheck")}
            type="password"
            placeholder="비밀번호 확인"
            className={`border p-2 rounded-sm ${passwordForm.formState.errors.passwordCheck ? "border-red-500 bg-red-100" : "border-gray-300"}`}
          />
          {passwordForm.formState.errors.passwordCheck && (
            <div className="text-red-500 text-sm">{passwordForm.formState.errors.passwordCheck.message}</div>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md"
          >
            다음
          </button>
        </form>
      )}

      
      {step === 3 && (
        <form className="flex flex-col gap-3 w-[300px]" onSubmit={nameForm.handleSubmit(handleSignup)}>
          <input
            {...nameForm.register("name")}
            type="text"
            placeholder="이름"
            className={`border p-2 rounded-sm ${nameForm.formState.errors.name ? "border-red-500 bg-red-100" : "border-gray-300"}`}
          />
          {nameForm.formState.errors.name && (
            <div className="text-red-500 text-sm">{nameForm.formState.errors.name.message}</div>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md"
          >
            회원가입 완료
          </button>
        </form>
      )}
    </div>
  );
};

export default SignupPage;