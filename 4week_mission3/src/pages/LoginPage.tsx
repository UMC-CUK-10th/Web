import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { postSignIn } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "../constants/key";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다!"),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

const SignInPage = () => {
  const navigate = useNavigate();
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await postSignIn(data);
      setItem(res.data.accessToken);
      alert("로그인 성공!");
      navigate("/my");
    } catch (error) {
      alert("로그인 실패: 이메일이나 비밀번호를 확인하세요.");
    }
  };

  return (
    // 화면 정중앙 정렬을 위한 wrapper
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-sm p-6">
        <h1 className="text-2xl font-bold mb-8 text-center">로그인</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <input 
              {...register("email")} 
              placeholder="이메일" 
              className={`border p-3 rounded-md outline-none ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} 
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <input 
              type="password" 
              {...register("password")} 
              placeholder="비밀번호" 
              className={`border p-3 rounded-md outline-none ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} 
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button className="bg-blue-500 hover:bg-[#7db386] text-white p-3 rounded-md font-bold mt-2 transition-colors">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;