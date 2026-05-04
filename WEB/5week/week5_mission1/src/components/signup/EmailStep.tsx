import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailSchema, type EmailFormValues } from '../../schemas/authSchema';

interface Props {
  onNext: (email: string) => void;
}

const EmailStep = ({ onNext }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    mode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit((data) => onNext(data.email))} className="flex flex-col gap-5">
      {/* 구글 로그인 버튼 (화이트 테마) */}
      <button
        type="button"
        className="w-full border border-slate-200 bg-white text-slate-700 py-3.5 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-all text-sm font-bold shadow-sm"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        구글로 계속하기
      </button>

      <div className="flex items-center gap-3 py-2">
        <div className="flex-1 h-px bg-slate-100" />
        <span className="text-slate-300 text-[10px] font-bold tracking-widest">OR</span>
        <div className="flex-1 h-px bg-slate-100" />
      </div>

      <div className="flex flex-col gap-1">
        <input
          {...register('email')}
          type="email"
          placeholder="이메일을 입력해주세요"
          className="w-full bg-slate-50 border border-slate-100 text-slate-900 placeholder-slate-400 px-4 py-4 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-sm"
        />
        {errors.email && (
          <p className="text-red-500 text-xs pl-2 mt-1 font-medium">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="w-full py-4 rounded-2xl text-sm font-black transition-all shadow-lg
          disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed
          enabled:bg-emerald-600 enabled:text-white enabled:hover:bg-emerald-700 enabled:shadow-emerald-600/20 active:scale-95"
      >
        다음 단계로
      </button>
    </form>
  );
};

export default EmailStep;