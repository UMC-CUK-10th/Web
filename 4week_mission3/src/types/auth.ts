import type { CommonResponse } from "./common";

export type RequestSignUpDto = {
  name: string;
  email: string;
  password?: string;
  bio?: string;
  avatar?: string;
};

export type ResponseSignUpDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}>;

export type RequestSignInDto = {
  email: string;
  password?: string;
};

export type ResponseSignInDto = CommonResponse<{
  accessToken: string;
  refreshToken: string;
}>;

export type ResponseMyInfoDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}>;