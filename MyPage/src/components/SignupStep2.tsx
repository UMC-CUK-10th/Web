import { useState } from "react";

interface SignupStep2Props {
    onNext: (data: { password: string }) => void;
    onPrev: () => void; // 이전 단계로 돌아가는 기능
}

export default function SignupStep2({ onNext, onPrev }: SignupStep2Props) {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errors, setErrors] = useState({ password: "", passwordConfirm: "" });

    // 버튼 활성화 조건: 두 칸 모두 입력되었을 때
    const isNotEmpty = password.trim() !== "" && passwordConfirm.trim() !== "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "password") setPassword(value);
        else setPasswordConfirm(value);

        // 입력 시 해당 필드 에러 초기화
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        // 1. 기본 브라우저 유효성 검사 (minLength 등)
        if (!form.checkValidity()) {
            const newErrors = { password: "", passwordConfirm: "" };
            Array.from(form.elements).forEach((el) => {
                if (el instanceof HTMLInputElement && el.name) {
                    if (!el.validity.valid) {
                        newErrors[el.name as keyof typeof newErrors] = el.validationMessage;
                    }
                }
            });
            setErrors(newErrors);
            return;
        }

        // 2. 커스텀 검사: 비밀번호 일치 여부
        if (password !== passwordConfirm) {
            setErrors((prev) => ({
                ...prev,
                passwordConfirm: "비밀번호가 일치하지 않습니다."
            }));
            return;
        }

        // ✅ 모든 검증 통과 시 최종 데이터 전달
        onNext({ password });
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            {/* 비밀번호 입력 */}
            <div className="flex flex-col gap-1">
                <input
                    name="password"
                    type="password"
                    placeholder="비밀번호 (8자 이상)"
                    className={`border p-2 rounded outline-none focus:ring-2 ${
                        errors.password ? "border-red-500 ring-red-100" : "border-gray-300 focus:ring-blue-100"
                    }`}
                    value={password}
                    onChange={handleChange}
                    required
                    minLength={8}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">⚠️ {errors.password}</p>}
            </div>

            {/* 비밀번호 확인 입력 */}
            <div className="flex flex-col gap-1">
                <input
                    name="passwordConfirm"
                    type="password"
                    placeholder="비밀번호 확인"
                    className={`border p-2 rounded outline-none focus:ring-2 ${
                        errors.passwordConfirm ? "border-red-500 ring-red-100" : "border-gray-300 focus:ring-blue-100"
                    }`}
                    value={passwordConfirm}
                    onChange={handleChange}
                    required
                />
                {errors.passwordConfirm && <p className="text-red-500 text-xs mt-1">⚠️ {errors.passwordConfirm}</p>}
            </div>

            <div className="flex gap-2 mt-2">
                <button
                    type="button"
                    onClick={onPrev}
                    className="flex-1 p-2 rounded font-bold border border-gray-300 hover:bg-gray-50"
                >
                    이전
                </button>
                <button
                    type="submit"
                    disabled={!isNotEmpty}
                    className={`flex-1 p-2 rounded font-bold transition-all ${
                        !isNotEmpty
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                    회원가입 완료
                </button>
            </div>
        </form>
    );
}