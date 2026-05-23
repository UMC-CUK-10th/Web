import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useMutation,
} from "@tanstack/react-query";

import useForm from "../hooks/useForm";

import {
  type UserSigninInformation,
  validateSignin,
} from "./utils/validate";

import {
  login,
} from "../apis/auth";

import {
  useAuth,
} from "../contexts/AuthContext";

const LoginPage = () => {
  const navigate =
    useNavigate();

  const { setUser } =
    useAuth();

  const [
    serverError,
    setServerError,
  ] = useState("");

  // ================= Google Login =================
  const handleGoogleLogin =
    () => {
      window.location.href =
        "http://localhost:8000/v1/auth/google/login";
    };

  // ================= form =================
  const {
    values,
    errors,
    touched,
    getInputProps,
  } =
    useForm<UserSigninInformation>(
      {
        initialValue: {
          email: "",
          password: "",
        },

        validate:
          validateSignin,
      }
    );

  // ================= login mutation =================
  const {
    mutate: loginMutate,
    isPending,
  } = useMutation({
    mutationFn: login,

    onSuccess: (
      data
    ) => {
      const userData =
        data.data;

      // access token 저장
      localStorage.setItem(
        "accessToken",
        userData.accessToken
      );

      // context 저장
      setUser({
        id: userData.id,
        name:
          userData.name,
        email:
          userData.email,

        bio:
          userData.bio,

        avatar:
          userData.avatar,
      });

      alert(
        "로그인 성공!"
      );

      navigate("/");
    },

    onError: (
      err: any
    ) => {
      setServerError(
        err?.response?.data
          ?.message ||
          "로그인 실패"
      );
    },
  });

  // ================= submit =================
  const handleSubmit =
    () => {
      setServerError(
        ""
      );

      loginMutate(
        values
      );
    };

  // ================= button disabled =================
  const isDisabled =
    Object.values(
      errors || {}
    ).some(
      (e) =>
        e.length > 0
    ) ||
    Object.values(
      values
    ).some(
      (v) => v === ""
    );

  return (
    <div
      className="
        min-h-screen
        bg-black
        flex
        items-center
        justify-center
        px-5
      "
    >
      <div
        className="
          w-full
          max-w-[420px]
          bg-[#181818]
          border
          border-gray-800
          rounded-2xl
          p-8
        "
      >
        <h1
          className="
            text-4xl
            font-bold
            text-white
            mb-8
            text-center
          "
        >
          로그인
        </h1>

        <div className="flex flex-col gap-4">
          {/* 이메일 */}
          <div>
            <input
              {...getInputProps(
                "email"
              )}
              placeholder="이메일"
              className="
                w-full
                bg-[#222]
                border
                border-gray-700
                rounded-lg
                px-4
                py-3
                text-white
                outline-none
                focus:border-pink-500
              "
            />

            {errors?.email &&
              touched?.email && (
                <p
                  className="
                    text-red-500
                    text-sm
                    mt-1
                  "
                >
                  {
                    errors.email
                  }
                </p>
              )}
          </div>

          {/* 비밀번호 */}
          <div>
            <input
              {...getInputProps(
                "password"
              )}
              placeholder="비밀번호"
              type="password"
              className="
                w-full
                bg-[#222]
                border
                border-gray-700
                rounded-lg
                px-4
                py-3
                text-white
                outline-none
                focus:border-pink-500
              "
            />

            {errors?.password &&
              touched?.password && (
                <p
                  className="
                    text-red-500
                    text-sm
                    mt-1
                  "
                >
                  {
                    errors.password
                  }
                </p>
              )}
          </div>

          {/* 서버 에러 */}
          {serverError && (
            <div
              className="
                text-red-500
                text-sm
              "
            >
              {serverError}
            </div>
          )}

          {/* 로그인 버튼 */}
          <button
            onClick={
              handleSubmit
            }
            disabled={
              isDisabled ||
              isPending
            }
            className="
              w-full
              bg-pink-500
              hover:bg-pink-600
              transition
              text-white
              py-3
              rounded-lg
              font-bold
              disabled:bg-gray-500
            "
          >
            {isPending
              ? "로그인 중..."
              : "로그인"}
          </button>

          {/* 구글 로그인 */}
          <button
            onClick={
              handleGoogleLogin
            }
            className="
              w-full
              border
              border-gray-700
              py-3
              rounded-lg
              text-white
              hover:bg-[#222]
              transition
            "
          >
            Google 로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;