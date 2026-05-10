import { createContext, useContext } from "react";
import type { RequestSigninDto, ResponseMyInfoDto } from "../types/auth";

type User = ResponseMyInfoDto["data"];

export interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  login: (signInData: RequestSigninDto) => Promise<boolean>;
  logout: () => Promise<void>;
  setAuthTokens: (accessToken: string, refreshToken: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  user: null,
  login: async () => false,
  logout: async () => {},
  setAuthTokens: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthContext를 찾을 수 없습니다.");
  }

  return context;
};
