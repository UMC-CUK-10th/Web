import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { postSignup } from '../apis/auth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../constans/key';

import EmailStep from '../components/signup/EmailStep';
import PasswordStep from '../components/signup/PasswordStep';
import NicknameStep from '../components/signup/NicknameStep';

type Step = 'email' | 'password' | 'nickname';

interface SignupForm {
  email: string;
  password: string;
}

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('email');
  const [form, setForm] = useState<SignupForm>({ email: '', password: '' });
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const handleEmailNext = (value: string) => {
    setForm(prev => ({ ...prev, email: value }));
    setStep('password');
  };

  const handlePasswordNext = (value: string) => {
    setForm(prev => ({ ...prev, password: value }));
    setStep('nickname');
  };

  const handleSignup = async (name: string) => {
    try {
      setIsLoading(true);
      setServerError(null);

      const response = await postSignup({ 
        email: form.email, 
        password: form.password, 
        passwordConfirm: form.password, 
        name: name 
      });

      // 서버 응답 구조(data.data)에 맞춰 토큰 저장 🍯
      if (response && response.data) {
        setAccessToken(response.data.accessToken); 
        setRefreshToken(response.data.refreshToken);
        alert("반갑습니다! 회원가입이 완료되었습니다.");
        navigate('/login');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // 서버가 보내주는 구체적인 에러 메시지(예: 이미 가입된 이메일)를 우선 표시합니다. 🐾
        const errorMessage = err.response?.data?.message || '회원가입에 실패했습니다.';
        setServerError(errorMessage);
      } else {
        setServerError('네트워크 연결이 원활하지 않습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 'password') setStep('email');
    else if (step === 'nickname') setStep('password');
    else navigate(-1);
  };

  const progress =
    step === 'email' ? 'w-1/3' :
    step === 'password' ? 'w-2/3' :
    'w-full';

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[400px] bg-white p-10 rounded-[32px] shadow-2xl shadow-emerald-900/5 border border-emerald-50 relative overflow-hidden animate-in fade-in zoom-in duration-500">

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
          <div className={`h-full bg-emerald-500 transition-all duration-500 ease-out ${progress}`} />
        </div>

        {/* Header */}
        <div className="flex items-center mb-8 relative">
          <button 
            onClick={handleBack} 
            className="absolute left-0 text-slate-400 text-2xl hover:text-emerald-600 transition-colors w-10 h-10 flex items-center justify-center rounded-xl hover:bg-emerald-50"
          >
            ‹
          </button>
          <div className="w-full text-center">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-1 block">
                Step {step === 'email' ? '01' : step === 'password' ? '02' : '03'}
            </span>
            <h1 className="text-xl font-black text-slate-900">회원가입</h1>
          </div>
        </div>

        {serverError && (
          <div className="bg-red-50 border border-red-100 p-3 rounded-xl mb-6">
            <p className="text-red-500 text-xs text-center font-medium">{serverError}</p>
          </div>
        )}

        <div className="min-h-[220px] flex flex-col justify-center">
          {step === 'email' && <EmailStep onNext={handleEmailNext} />}
          {step === 'password' && (
            <PasswordStep
              email={form.email || ""}
              onNext={handlePasswordNext}
            />
          )}
          {step === 'nickname' && (
            <NicknameStep onSubmit={handleSignup} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;