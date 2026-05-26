import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";

interface AuthContextValue {
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  accessToken: string | null; // 1. 타입 추가
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: (accessToken: string, refreshToken: string) => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  // 2. 토큰 상태 관리 추가 (로컬스토리지 초기값 활용)
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)
  );

  const handleLogin = (at: string, rt: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, at);
    localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, rt);
    setAccessToken(at); // 상태 업데이트
    setIsLoggedIn(true);
    setIsAuthLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
    localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
    localStorage.removeItem("nickname");
    setAccessToken(null); // 상태 초기화
    setIsLoggedIn(false);
    setIsAuthLoading(false);
  };

  useEffect(() => {
    const at = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

    if (!at) {
      setIsLoggedIn(false);
      setIsAuthLoading(false);
      return;
    }

    getMyInfo()
      .then(() => {
        setIsLoggedIn(true);
        setAccessToken(at);
      })
      .catch(() => {
        handleLogout(); // 에러 발생 시 공통 로그아웃 로직 실행
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  }, []);

  const value = useMemo(
    () => ({
      isLoggedIn,
      isAuthLoading,
      accessToken, // 3. value에 추가하여 외부(Navbar 등)에서 접근 가능하게 함
      setIsLoggedIn,
      handleLogin,
      handleLogout,
    }),
    [isLoggedIn, isAuthLoading, accessToken], // 의존성 배열에 추가
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};