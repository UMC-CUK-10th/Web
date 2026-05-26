import { useState } from "react";
import SignupStep1 from "../components/SignupStep1";
import SignupStep2 from "../components/SignupStep2";
import BouncyText from "../components/BouncyText";
import SignupStep3 from "../components/SignupStep3";

// 여러 단계로 나누어져 있는 폼
// 부모가 데이터를 모아서 관리하는 구조 -> 각 스텝 컴포넌트 내부에서 useForm 을 독립적으로 사용하기

export interface SignupForm {
    email: string;
    username: string; // 아이디
    nickname: string;
    password?: string; // 단계별로 입력받으므로 선택적으로 표시
    passwordConfirm?: string;
}

export default function Signup() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ email: "", password: "", nickname: "" });

    // 다음 단계로 이동하는 함수
    const nextStep = (data: Partial<typeof formData>) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setStep((prev) => prev + 1);
    };

    const handleFinish = (data: {nickname: string}) => {
        const finalData = { ...formData, ...data };
        
        alert(`${finalData.nickname}님 환영합니다`);

        window.location.replace("/")
    }

    return (
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6">회원가입</h1>
            {/* 구글 로그인 버튼 (컴포넌트가 있다고 가정) */}
            <button className="w-full border p-2 rounded mb-4">Google로 시작하기</button>

            <div className="text-center my-4 text-gray-500">OR</div>
            {step === 1 && (
                <SignupStep1 
                    defaultValues={{
                        email: formData.email
                    }} 
                    onNext={nextStep} 
                />
            )}

            {step === 2 && (
                <>
                    <BouncyText text={formData.email}/>
                    <SignupStep2
                        onNext={nextStep} 
                        onPrev={() => setStep(1)}
                    />
                </>
            )}

            {step === 3 && (
                <SignupStep3
                    onNext={handleFinish} 
                    onPrev={() => setStep(2)}
                />
            )}
        </div>
    );
}