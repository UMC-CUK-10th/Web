import { useState } from "react";
import useForm from "../hooks/useForm";
import { type UserSigninInformation, validateSignin } from "./utils/validate";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: { email: "", password: "" },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    try {
      setServerError("");
      const res = await axios.post("http://localhost:8000/v1/auth/signin", values);

      if (res.data.status) {
        localStorage.setItem("username", res.data.data.name);
        alert("로그인 성공!");
        navigate("/"); // 로그인 성공 시 홈으로
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
        <input {...getInputProps("email")} placeholder="이메일" className="border p-2 rounded-sm" />
        {errors?.email && touched?.email && <div className="text-red-500 text-sm">{errors.email}</div>}

        <input
          {...getInputProps("password")}
          placeholder="비밀번호"
          type="password"
          className="border p-2 rounded-sm"
        />
        {errors?.password && touched?.password && <div className="text-red-500 text-sm">{errors.password}</div>}

        {serverError && <div className="text-red-500 text-sm">{serverError}</div>}

        <button
          onClick={handleSubmit}
          disabled={isDisabled}
          className="bg-blue-600 text-white py-2 rounded-md mt-2"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;