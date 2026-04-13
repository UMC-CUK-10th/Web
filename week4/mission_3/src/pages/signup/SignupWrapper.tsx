import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export type SignupForm = {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
};

const SignupWrapper = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<SignupForm>({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  const updateForm = (key: keyof SignupForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setForm({ email: "", password: "", confirmPassword: "", nickname: "" });
  };

  return (
    <Outlet context={{ form, updateForm, resetForm, navigate }} />
  );
};

export default SignupWrapper;