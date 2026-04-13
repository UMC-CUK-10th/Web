import {useForm} from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

interface LoginForm {
    email: string;
    password: string;
}

export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useUser();
    
    // useForm 을 이용하자
    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<LoginForm>({
        mode: "onChange" // 유효성 검사
    })


    // 제출 핸들러
    const onSubmit = async (data: LoginForm) => {
        const url = "http://localhost:8000/v1/auth/signin";
        try {
            const response = await axios.post(url, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200 || response.status === 201) {
                const userData = response.data.data;
                const token = userData.accessToken;
                
                if (token) {
                    localStorage.setItem("accessToken", token);
                    console.log(`${token}`);
                } else {
                    console.log("토큰이 없습니다");
                }

                setUser(userData);

                alert(`${userData.name}님, 반갑습니다!`);
                
                // 메인 페이지로 이동
                navigate("/");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "로그인에 실패했습니다.";
                alert(`에러: ${message}`);
            } else {
                console.error("Unknown Error:", error);
            }
        }
    }

    return (
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6">로그인</h1>

            {/* 구글 로그인 버튼 (컴포넌트가 있다고 가정) */}
            <button className="w-full border p-2 rounded mb-4">Google로 시작하기</button>

            <div className="text-center my-4 text-gray-500">OR</div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                        className={`border p-2 rounded outline-none focus:ring-2 ${
                            errors.email ? "border-red-500 ring-red-100" : "border-gray-300 focus:ring-blue-100"
                        }`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">⚠️ {errors.email.message}</p>}
                </div>

                {/* 패스워드 입력 */}
                <div className="flex flex-col gap-1">
                    <input
                        {...register("password", {
                            required: "비밀번호는 필수 입력 항목입니다.",
                            minLength: {
                                value: 8,
                                message: "비밀번호는 최소 8자 이상이어야 합니다."
                            }
                        })}
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        className={`border p-2 rounded outline-none focus:ring-2 ${
                            errors.password ? "border-red-500 ring-red-100" : "border-gray-300 focus:ring-blue-100"
                        }`}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">⚠️ {errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={!isValid}
                    className={`p-2 rounded font-bold transition-all ${
                        !isValid 
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