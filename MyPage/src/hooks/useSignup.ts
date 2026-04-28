import { useState } from "react";
import API from "../lib/axios";
import type { SignupForm } from "../types/SignupForm";

export const useSignup = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<SignupForm>({
        email: "",
        password: "",
        passwordConfirm: "",
        name: ""
    });

    const nextStep = (data: Partial<typeof formData>) => {
        setFormData((prev) => ({...prev, ...data}));
        setStep((prev) => prev + 1);
    };

    const prevStep = () => setStep((prev) => prev - 1);

    const handleSignup = async (data: {name: string}) => {
        const finalData = {
            ...formData,
            name: data.name
        };

        try {
            await API.post("/auth/signup", finalData);
            alert(`${finalData.name}님 환영합니다.`);
            window.location.replace("/");
        } catch (error) {
            console.error("회원가입 실패:", error);
            throw error;
        }
    };

    return { step, formData, nextStep, prevStep, handleSignup, setStep };
}