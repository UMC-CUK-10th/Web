import { useForm } from "react-hook-form";
import type { SignupForm } from "../pages/Signup";

// 비밀번호와 비밀번호 확인값이 일치하는지? -> validate 옵션으로 처리하기

interface SignupStep2Props {
    onNext: (data: { password: string }) => void;
    onPrev: () => void; // 이전 단계로 돌아가는 기능
}

export default function SignupStep2({ onNext, onPrev }: SignupStep2Props) {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, isValid}
    } = useForm<SignupForm>({
        mode: "onChange"
    });

    const passwordValue = watch("password") // password 필드를 실시간으로 감시

    const onSubmit = (data: any) => {
        onNext({
            password: data.password
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* 비밀번호 입력 */}
            <div className="flex flex-col gap-1">
                <input
                    {...register("password", {
                        required: "비밀번호는 필수입니다.",
                        minLength: {
                            value: 8,
                            message: "비밀번호는 최소 8자 이상이어야 합니다."
                        }
                    })}
                    type="password"
                    placeholder="비밀번호 (8자 이상)"
                    className={`border p-2 rounded outline-none focus:ring-2 ${
                        errors.password ? "border-red-500 ring-red-100" : "border-gray-300 focus:ring-blue-100"
                    }`}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">⚠️ {errors.password.message}</p>}
            </div>

            {/* 비밀번호 확인 입력 */}
            <div className="flex flex-col gap-1">
                <input
                    {...register("passwordConfirm", {
                        required: "비밀번호는 확인이 필요합니다.",
                        validate: (value) => value === passwordValue || "비밀번호가 일치하지 않습니다."
                    })}
                    type="password"
                    placeholder="비밀번호 확인"
                    className={`border p-2 rounded outline-none focus:ring-2 ${
                        errors.passwordConfirm ? "border-red-500 ring-red-100" : "border-gray-300 focus:ring-blue-100"
                    }`}
                />
                {errors.passwordConfirm && <p className="text-red-500 text-xs mt-1">⚠️ {errors.passwordConfirm.message}</p>}
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
                    disabled={!isValid}
                    className={`flex-1 p-2 rounded font-bold transition-all ${
                        !isValid
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                    다음
                </button>
            </div>
        </form>
    );
}