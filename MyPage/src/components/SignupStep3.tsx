import { useForm } from "react-hook-form";
import type { SignupForm } from "../pages/Signup";

interface SignupStep3Props {
    onNext: (data: { name: string }) => void;
    onPrev: () => void;
}

export default function SignupStep3({ onNext, onPrev }: SignupStep3Props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<SignupForm>({
        mode: "onChange" // 유효성 검사
    })

    const onSubmit = (data: SignupForm) => {
        onNext({
            name: data.name.trim()
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 ml-1">
                    사용하실 닉네임을 입력해주세요
                </label>
                <input
                    {...register("name", {
                        required: "닉네임은 필수입니다.",
                        minLength: {
                            value: 2,
                            message: "닉네임은 최소 2자 이상이어야 합니다."
                        },
                        maxLength: {
                            value: 10,
                            message: "닉네임은 최대 10자 이하이어야 합니다."
                        },
                        validate: (value) => value.trim().length >= 2 || "닉네임은 공백 제외 2자 이상이어야 합니다."
                    })}
                    type="text"
                    placeholder="닉네임 (2~10자)"
                    className={`border p-3 rounded-xl outline-none focus:ring-2 transition-all ${errors.name ? "border-red-500 ring-red-100" : "border-gray-300 focus:ring-blue-100"
                        }`}
                    autoFocus
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 px-1">⚠️ {errors.name.message}</p>}
            </div>

            <div className="flex gap-2 mt-4">
                <button
                    type="button"
                    onClick={onPrev}
                    className="flex-1 p-3 rounded-xl font-bold border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                    이전
                </button>
                <button
                    type="submit"
                    disabled={!isValid}
                    className={`flex-1 p-3 rounded-xl font-bold transition-all ${!isValid
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100"
                        }`}
                >
                    회원가입 완료
                </button>
            </div>
        </form>
    );
}