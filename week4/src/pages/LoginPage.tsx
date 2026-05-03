import { isAxiosError } from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { postSignin } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/";

  const { values, error, touch, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await postSignin(values);
      const { accessToken, refreshToken } = response.data;

      localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, accessToken);
      localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, refreshToken);

      navigate(redirectPath, { replace: true });
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.response?.data?.message ?? "로그인에 실패했습니다.");
        return;
      }

      console.error(error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  const isDisabled =
    Object.values(error || {}).some((error) => !!error) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex min-h-full w-full items-center justify-center bg-transparent text-gray-900">
      <div className="w-full max-w-sm space-y-6 rounded-[28px] bg-white/75 p-8 text-rose-950 shadow-xl ring-1 ring-rose-200 backdrop-blur">
        <div className="relative mb-4 flex items-center justify-center">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 rounded-full p-2 transition-colors hover:bg-rose-100"
            aria-label="뒤로 가기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-rose-950">로그인</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              {...getInputProps("email")}
              className={`w-full rounded-xl border bg-white/80 p-3 text-rose-950 placeholder:text-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400
                                ${error?.email && touch?.email ? "border-red-400" : "border-rose-200"}`}
              type="email"
              placeholder="이메일을 입력해주세요"
            />
            {error?.email && touch?.email && (
              <div className="mt-1 text-sm text-red-500">{error.email}</div>
            )}
          </div>

          <div>
            <input
              {...getInputProps("password")}
              className={`w-full rounded-xl border bg-white/80 p-3 text-rose-950 placeholder:text-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400
                                ${error?.password && touch?.password ? "border-red-400" : "border-rose-200"}`}
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
            {error?.password && touch?.password && (
              <div className="mt-1 text-sm text-red-500">{error.password}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 py-3 font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            로그인
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full rounded-xl border border-rose-200 bg-white/80 py-3 font-medium text-rose-950 shadow-sm transition hover:bg-rose-50"
          >
            <div className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="size-5"
                aria-hidden="true"
              >
                <path
                  fill="#FFC107"
                  d="M43.611 20.083H42V20H24v8h11.303C33.655 32.657 29.207 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.144 35.091 26.715 36 24 36c-5.186 0-9.625-3.329-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                />
                <path
                  fill="#1976D2"
                  d="M43.611 20.083H42V20H24v8h11.303a12.053 12.053 0 0 1-4.084 5.571h.003l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                />
              </svg>
              <span>Google 로그인</span>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};
