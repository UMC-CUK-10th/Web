import { useState } from "react";
import { useForm } from "react-hook-form";

interface SignupStep1Props {
    defaultValues: { email: string };
    onNext: (data: { email: string }) => void;
}

export default function SignupStep1({ defaultValues, onNext }: SignupStep1Props) {
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid
        }
    } = useForm({
        mode: "onChange",
        defaultValues
    })

    return (
        <form onSubmit={handleSubmit(onNext)} noValidate className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <input
                    {...register("email", {
                        required: "이메일은 필수 입력 항목입니다.",
                        pattern: {
                            // @ 포함하는지, . 포함하는지, 공백인지
                            value: /\S+@\S+\.\S+/,
                            message: "이메일 형식이 올바르지 않습니다."
                        }
                    })}
                    type="email"
                    placeholder="이메일을 입력하세요"
                    className={`border p-2 rounded outline-none focus:ring-2 ${errors.email ? "border-red-500 ring-red-100" : "border-gray-300 focus:ring-blue-100"
                        }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">⚠️ {errors.email.message}</p>}
            </div>

            <button
                type="submit"
                disabled={!isValid}
                className={`p-2 rounded font-bold transition-all ${!isValid
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                    }`}
            >
                다음
            </button>
        </form>
    );
}