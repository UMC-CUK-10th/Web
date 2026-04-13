import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postSignUp } from "../apis/auth";

const schema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  email: z.string().email("올바른 이메일 형식이 아닙니다!"),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다.").max(20, "비밀번호는 20자 이하이어야 합니다."),
  passwordCheck: z.string().min(8, "비밀번호 확인을 입력해주세요."),
}).refine((data) => data.password === data.passwordCheck, {
  path: ["passwordCheck"],
  message: "비밀번호가 일치하지 않습니다.",
});

type FormFields = z.infer<typeof schema>;

const SignUpPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: { name: "", email: "", password: "", passwordCheck: "" }
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest } = data;
    try {
      await postSignUp(rest);
      alert("회원가입 성공!");
    } catch (error) {
      alert("회원가입 실패");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-sm p-6">
        <h1 className="text-2xl font-bold mb-8 text-center">회원가입</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <input {...register("name")} placeholder="이름" className={`border p-3 rounded-md outline-none focus:border-blue-500 ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <input {...register("email")} placeholder="이메일" className={`border p-3 rounded-md outline-none focus:border-blue-500 ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <input type="password" {...register("password")} placeholder="비밀번호" className={`border p-3 rounded-md outline-none focus:border-blue-500 ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <input type="password" {...register("passwordCheck")} placeholder="비밀번호 확인" className={`border p-3 rounded-md outline-none focus:border-blue-500 ${errors.passwordCheck ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} />
            {errors.passwordCheck && <p className="text-red-500 text-sm">{errors.passwordCheck.message}</p>}
          </div>

          <button 
            disabled={isSubmitting} 
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md font-bold mt-2 transition-colors disabled:opacity-50"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;