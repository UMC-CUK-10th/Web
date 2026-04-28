import { useState } from "react";
import useForm from "../hooks/useForm";
import { type UserSigninInformation, validateSignin } from "./utils/validate";
import { useNavigate } from "react-router-dom";
import api from "../apis/axios";
import { useAuth } from "../contexts/AuthContext"; // 🔥 추가

const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/v1/auth/google/login";
  };
  const navigate = useNavigate();
  const { setUser } = useAuth(); // 🔥 핵심
  const [serverError, setServerError] = useState("");

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: { email: "", password: "" },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    try {
      setServerError("");

      const res = await api.post("/auth/signin", values);

      if (res.data.status) {
        const userData = res.data.data;

        // 🔥 핵심 1: context에 저장 (로그인 상태 반영)
        localStorage.setItem("accessToken", userData.accessToken);

        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
        });

        // 🔥 (선택) 기존 localStorage 유지
        localStorage.setItem("username", userData.name);

        alert("로그인 성공!");

        // 🔥 마이페이지로 보내는게 UX 좋음
        navigate("/mypage");
      } else {
        setServerError(res.data.message || "로그인 실패");
      }
    } catch (err: any) {
      setServerError("서버와 연결되지 않았습니다.");
    }
  };

  const isDisabled =
    Object.values(errors || {}).some((e) => e.length > 0) ||
    Object.values(values).some((v) => v === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3 w-[300px]">
        <input
          {...getInputProps("email")}
          placeholder="이메일"
          className="border p-2 rounded-sm"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        <input
          {...getInputProps("password")}
          placeholder="비밀번호"
          type="password"
          className="border p-2 rounded-sm"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        {serverError && (
          <div className="text-red-500 text-sm">{serverError}</div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isDisabled}
          className="bg-blue-600 text-white py-2 rounded-md mt-2 disabled:bg-gray-400"
        >
          로그인
        </button>
        <button onClick={handleGoogleLogin}>
        Google 로그인
      </button>
      </div>
    </div>
  );
};

export default LoginPage;