import { useOutletContext } from "react-router-dom";
import useForm from "../../hooks/useForm";
import type{ SignupForm } from "./SignupWrapper";

const SignupStep1 = () => {
  const { form, updateForm, navigate } = useOutletContext<{
    form: SignupForm;
    updateForm: (key: keyof SignupForm, value: string) => void;
    navigate: (path: string) => void;
  }>();

  const { values, errors, touched, getInputProps } = useForm({
    initialValue: { email: form.email },
    validate: (vals) => ({
      email: !/\S+@\S+\.\S+/.test(vals.email) ? "올바른 이메일 형식이 아닙니다." : "",
    }),
  });

  const handleNext = () => {
    updateForm("email", values.email);
    navigate("/signup/step2");
  };

  const isDisabled = !!errors.email;

  return (
    <div className="flex flex-col gap-3 w-[300px]">
      <input {...getInputProps("email")} placeholder="이메일" className="border p-2 rounded-sm" />
      {errors.email && touched.email && <div className="text-red-500 text-sm">{errors.email}</div>}
      <button onClick={handleNext} disabled={isDisabled} className="bg-blue-600 text-white py-2 rounded-md">
        다음
      </button>
    </div>
  );
};

export default SignupStep1;