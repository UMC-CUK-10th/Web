import { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { postSignin } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import useForm from "../hooks/useForm";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { validateSignin, type UserSigninInformation } from "../utils/validate";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [submitError, setSubmitError] = useState("");
  const redirectPath = location.state?.from?.pathname || "/";
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );
  const { setItem: setUserName } = useLocalStorage(LOCAL_STORAGE_KEY.userName);

  const { values, error, touch, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const loginMutation = useMutation({
    mutationFn: postSignin,
    onSuccess: (response) => {
      const { accessToken, refreshToken, name } = response.data;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUserName(name);
      setSubmitError("");

      navigate(redirectPath, { replace: true });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message ?? "로그인에 실패했습니다.";
        setSubmitError(Array.isArray(message) ? message.join(", ") : String(message));
        return;
      }

      setSubmitError("로그인에 실패했습니다.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    try {
      await loginMutation.mutateAsync(values);
    } catch {
      return;
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  const isDisabled =
    Object.values(error || {}).some((error) => !!error) ||
    Object.values(values).some((value) => value === "") ||
    loginMutation.isPending;

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
            {loginMutation.isPending ? "로그인 중..." : "로그인"}
          </button>

          {submitError && <p className="text-sm text-red-500">{submitError}</p>}

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
