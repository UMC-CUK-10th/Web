import { useState } from "react";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({email: "", password: ""});
    const isEmpty = email.trim() !== "" && password.trim() !== ""

    const handleChange = (e) => {
        const {name, value} = e.target;

        if (name === "email") setEmail(value);
        else setPassword(value);

        if (errors[name]) {
            setErrors((prev) => ({...prev, [name]: ""}));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        
        if (!form.checkValidity()) {
            const newErrors = { email: "", password: "" };

            Array.from(form.elements).forEach((element) => {
                if (element instanceof HTMLInputElement) {
                    if (element.name && !element.validity.valid) {
                        newErrors[element.name] = element.validationMessage;
                    }
                }
            })
            setErrors(newErrors);
            return
        }
        alert("로그인 성공!");
    };
    return (
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6">로그인</h1>

            {/* 구글 로그인 버튼 (컴포넌트가 있다고 가정) */}
            <button className="w-full border p-2 rounded mb-4">Google로 시작하기</button>

            <div className="text-center my-4 text-gray-500">OR</div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <input
                        name="email" // name 필수!
                        type="email"
                        placeholder="이메일을 입력하세요"
                        className={`border p-2 rounded outline-none focus:ring-2 ${
                            errors.email ? "border-red-500 ring-red-100" : "border-gray-300 focus:ring-blue-100"
                        }`}
                        value={email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">⚠️ {errors.email}</p>}
                </div>

                {/* 패스워드 입력 */}
                <div className="flex flex-col gap-1">
                    <input
                        name="password" // name 필수!
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        className={`border p-2 rounded outline-none focus:ring-2 ${
                            errors.password ? "border-red-500 ring-red-100" : "border-gray-300 focus:ring-blue-100"
                        }`}
                        value={password}
                        onChange={handleChange}
                        minLength={8}
                        required
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">⚠️ {errors.password}</p>}
                </div>

                <button
                    type="submit"
                    disabled={!isEmpty}
                    className={`p-2 rounded font-bold transition-all ${
                        !isEmpty 
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                        : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                    }`}
                >
                    로그인
                </button>
            </form>
        </div>
    )
}