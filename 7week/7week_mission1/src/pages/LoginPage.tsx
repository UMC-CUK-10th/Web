import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";
import { type UserSigninInformation, validateSignin } from "../utils/validate";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login, accessToken, isLoginLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [navigate, accessToken]);

  const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
    initialValue: { email: "", password: "" },
    validate: validateSignin,
  });

  const handleSubmit = () => {
    login(values);
  };

  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_API_BASE_URL + "/v1/auth/google/login";
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "") ||
    isLoginLoading;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          className={`border w-[300px] p-[10px] focus:border-[#807dff] rounded-sm outline-none transition-all ${
            errors?.email && touched?.email ? "border-red-500 bg-red-50" : "border-gray-300"
          }`}
          type="email"
          placeholder="이메일"
        />
        
        <input
          {...getInputProps("password")}
          className={`border w-[300px] p-[10px] focus:border-[#807dff] rounded-sm outline-none transition-all ${
            errors?.password && touched?.password ? "border-red-500 bg-red-50" : "border-gray-300"
          }`}
          type="password"
          placeholder="비밀번호"
        />
        
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoginLoading ? "로그인 중..." : "로그인"}
        </button>
        
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoginLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md"
        >
          <div className="flex items-center justify-center gap-4">
            <img
              src="/images/google.svg"
              alt="Google Logo"
              className="w-8 h-8 rounded-full" 
            />
            <span>구글 로그인</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;