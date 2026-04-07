import axiosInstance from "./axios";
import type { 
  RequestSignUpDto, ResponseSignUpDto, 
  RequestSignInDto, ResponseSignInDto, 
  ResponseMyInfoDto 
} from "../types/auth";

export const postSignUp = async (body: RequestSignUpDto): Promise<ResponseSignUpDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signup", body);
  return data;
};

export const postSignIn = async (body: RequestSignInDto): Promise<ResponseSignInDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);
  return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get("/v1/users/me");
  return data;
};