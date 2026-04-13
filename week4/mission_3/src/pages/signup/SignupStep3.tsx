import { useOutletContext } from "react-router-dom";
import useForm from "../../hooks/useForm";
import type{ SignupForm } from "./SignupWrapper";
import axios from "axios";

const SignupStep3 = () => {
  const { form, updateForm, navigate } = useOutletContext<{
    form: SignupForm;
    updateForm: (key: keyof SignupForm, value: string) => void;
    navigate: (path: string) => void;
  }>();
  const { values, errors, touched, getInputProps } = useForm({
    initialValue: { nickname: form.nickname },
    validate: (vals) => ({
      nickname: vals.nickname.length === 0 ? "닉네임을 입력해주세요." : "",
    }),
  });

  const handleSubmit = async () => {
    updateForm("nickname", values.nickname);
    try {
      const payload = {
        name: values.nickname,
        email: form.email,
        password: form.password,
      };
      const res = await axios.post("http://localhost:8000/v1/auth/signup", payload);
      if (res.data.status) {
        alert("회원가입 완료!");
        navigate("/");
      } else {
        alert(res.data.message || "회원가입 실패");
      }
    } catch (err) {
      console.error(err);
      alert("서버 연결 실패");
    }
  };

  const isDisabled = !!errors.nickname;

  return (
    <div className="flex flex-col gap-3 w-[300px]">
      <input {...getInputProps("nickname")} placeholder="닉네임" className="border p-2 rounded-sm" />
      {errors.nickname && touched.nickname && <div className="text-red-500 text-sm">{errors.nickname}</div>}
      <button onClick={handleSubmit} disabled={isDisabled} className="bg-blue-600 text-white py-2 rounded-md">
        회원가입 완료
      </button>
    </div>
  );
};

export default SignupStep3;