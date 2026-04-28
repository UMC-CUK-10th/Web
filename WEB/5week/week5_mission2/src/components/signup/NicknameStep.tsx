import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { nicknameSchema, type NicknameFormValues } from '../../schemas/authSchema';

interface Props {
  onSubmit: (name: string) => void;
  isLoading: boolean;
}

const NicknameStep = ({ onSubmit, isLoading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NicknameFormValues>({
    resolver: zodResolver(nicknameSchema),
    mode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data.name))} className="flex flex-col gap-6 items-center">
      {/* 프로필 이미지 자리 (에메랄드 무드) */}
      <div className="relative">
        <div className="w-24 h-24 rounded-[32px] bg-emerald-50 flex items-center justify-center border-2 border-emerald-100 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-emerald-200" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-8 h-8 rounded-xl border-4 border-white flex items-center justify-center">
            <span className="text-[10px]">✨</span>
        </div>
      </div>

      <div className="flex flex-col gap-1 w-full text-center">
        <h2 className="text-slate-900 font-bold mb-2">거의 다 왔어요!</h2>
        <input
          {...register('name')}
          type="text"
          placeholder="사용하실 닉네임"
          className="w-full bg-slate-50 border border-slate-100 text-slate-900 placeholder-slate-400 px-4 py-4 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-sm text-center font-bold"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1 font-medium">{errors.name.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="w-full py-4 rounded-2xl text-sm font-black transition-all shadow-lg
          disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed
          enabled:bg-emerald-600 enabled:text-white enabled:hover:bg-emerald-700 enabled:shadow-emerald-600/20 active:scale-95"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>처리 중...</span>
          </div>
        ) : 'GGULBEOM 가입 완료'}
      </button>
    </form>
  );
};

export default NicknameStep;