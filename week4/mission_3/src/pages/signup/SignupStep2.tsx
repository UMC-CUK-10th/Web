import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import useForm from "../../hooks/useForm";
import type{ SignupForm } from "./SignupWrapper";

const SignupStep2 = () => {
  const { form, updateForm, navigate } = useOutletContext<{
    form: SignupForm;
    updateForm: (key: keyof SignupForm, value: string) => void;
    navigate: (path: string) => void;
  }>();
  const [showPassword, setShowPassword] = useState(false);

  const { values, errors, getInputProps } = useForm({
    initialValue: { password: form.password, confirmPassword: form.confirmPassword },
    validate: (vals) => ({
      password: vals.password.length < 6 ? "비밀번호는 6자 이상이어야 합니다." : "",
      confirmPassword: vals.password !== vals.confirmPassword ? "비밀번호가 일치하지 않습니다." : "",
    }),
  });

  const handleNext = () => {
    updateForm("password", values.password);
    updateForm("confirmPassword", values.confirmPassword);
    navigate("/signup/step3");
  };

  const isDisabled = !!errors.password || !!errors.confirmPassword;

  return (
    <div className="flex flex-col gap-3 w-[300px]">
      <div className="relative">
        <input
          {...getInputProps("password")}
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호"
          className="border p-2 rounded-sm w-full"
        />
        <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2">
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>
      <input {...getInputProps("confirmPassword")} type="password" placeholder="비밀번호 재확인" className="border p-2 rounded-sm" />
      {(errors.password || errors.confirmPassword) && <div className="text-red-500 text-sm">{errors.password || errors.confirmPassword}</div>}
      <button onClick={handleNext} disabled={isDisabled} className="bg-blue-600 text-white py-2 rounded-md">
        다음
      </button>
    </div>
  );
};

export default SignupStep2;