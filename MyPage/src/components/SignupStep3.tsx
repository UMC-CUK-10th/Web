import { useState } from "react";

interface SignupStep3Props {
    onNext: (data: { nickname: string }) => void;
    onPrev: () => void;
}

export default function SignupStep3({ onNext, onPrev }: SignupStep3Props) {
    const [nickname, setNickname] = useState("");
    const [error, setError] = useState("");

    // 닉네임이 비어있지 않고 2글자 이상일 때만 버튼 활성화
    const isValid = nickname.trim().length >= 2;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
        if (error) setError(""); // 입력 시 에러 초기화
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 유효성 검사
        if (nickname.trim().length < 2) {
            setError("닉네임은 최소 2글자 이상이어야 합니다.");
            return;
        }

        if (nickname.trim().length > 10) {
            setError("닉네임은 최대 10글자까지 가능합니다.");
            return;
        }

        // 모든 검증 통과 시 부모의 handleFinish로 데이터 전달
        onNext({ nickname });
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 ml-1">
                    사용하실 닉네임을 입력해주세요
                </label>
                <input
                    name="nickname"
                    type="text"
                    placeholder="닉네임 (2~10자)"
                    className={`border p-3 rounded-xl outline-none focus:ring-2 transition-all ${
                        error ? "border-red-500 ring-red-100" : "border-gray-300 focus:ring-blue-100"
                    }`}
                    value={nickname}
                    onChange={handleChange}
                    autoFocus
                    required
                />
                {error && <p className="text-red-500 text-xs mt-1 px-1">⚠️ {error}</p>}
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
                    className={`flex-1 p-3 rounded-xl font-bold transition-all ${
                        !isValid
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