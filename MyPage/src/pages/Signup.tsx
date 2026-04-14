import { useSignup } from "../hooks/useSignup"; // 커스텀 훅 임포트
import SignupStep1 from "../components/SignupStep1";
import SignupStep2 from "../components/SignupStep2";
import SignupStep3 from "../components/SignupStep3";
import BouncyText from "../components/BouncyText";

export default function Signup() {
    const { step, formData, nextStep, prevStep, handleSignup, setStep } = useSignup();

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
                        onPrev={prevStep}
                    />
                </>
            )}

            {step === 3 && (
                <SignupStep3
                    onNext={handleSignup} 
                    onPrev={prevStep}
                />
            )}
        </div>
    );
}