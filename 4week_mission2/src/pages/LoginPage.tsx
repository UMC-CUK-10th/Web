import useForm from '../hooks/useForm';
import { validateSignin } from '../utils/validate';

const LoginPage = () => {
    const login = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: validateSignin,
    });

    const handlePressLogin = () => {
        console.log('로그인 시도:', login.values);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-8">
            <h1 className="text-2xl font-bold">로그인</h1>
            <div className="flex flex-col w-full max-w-sm gap-3">
                <input
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    {...login.getInputProps('email')}
                    className={`border p-2 rounded focus:outline-none ${
                        login.touched.email && login.errors.email ? 'border-red-500 bg-red-50' : 'focus:border-blue-500'
                    }`}
                />
                {login.touched.email && login.errors.email && (
                    <span className="text-red-500 text-sm">{login.errors.email}</span>
                )}

                <input
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    {...login.getInputProps('password')}
                    className={`border p-2 rounded focus:outline-none ${
                        login.touched.password && login.errors.password ? 'border-red-500 bg-red-50' : 'focus:border-blue-500'
                    }`}
                />
                {login.touched.password && login.errors.password && (
                    <span className="text-red-500 text-sm">{login.errors.password}</span>
                )}

                <button
                    onClick={handlePressLogin}
                    disabled={Object.values(login.errors).some(e => e) || !login.values.email}
                    className="bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer transition-colors"
                >
                    로그인
                </button>
            </div>
        </div>
    );
};

export default LoginPage;