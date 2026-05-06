import { createContext, useContext, useState, useEffect } from "react";
import type { PropsWithChildren } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { RequsetSigninDto } from "../types/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin } from "../apis/auth";

interface UserType {
  name: string;
  bio?: string;
  avatar?: string;
}

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserType | null; 
  login: (signInData: RequsetSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  user: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState<string | null>(getAccessTokenFromStorage());
  const [refreshToken, setRefreshToken] = useState<string | null>(getRefreshTokenFromStorage());
  
  // 💡 새로고침 시에도 유저 이름 유지를 위해 스토리지에서 기본값을 읽어오거나 초기화합니다.
  const [user, setUser] = useState<UserType | null>(() => {
    const savedUser = localStorage.getItem("user_info");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (signinData: RequsetSigninDto) => {
    try {
      const res = await postSignin(signinData) as any;
      const responseData = res.data?.data || res.data;

      if (responseData) {
        const newAccessToken = responseData.accessToken;
        const newRefreshToken = responseData.refreshToken;
        
        // 💡 스웨거 명세 확인 결과, responseData(또는 responseData.user)에 들어있는 유저 정보 파싱
        const userInfo = responseData.user || { name: responseData.name || "매튜" };

        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);
        // 유저 정보도 스토리지에 임시 저장 (새로고침 유지용)
        localStorage.setItem("user_info", JSON.stringify(userInfo));

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        setUser(userInfo); // 💡 여기서 전역 상태에 유저를 채워줘야 화면이 즉시 바뀝니다!

        alert('로그인 성공');
        window.location.href = "/";
      }
    } catch (error) {
      console.error("로그인 오류", error);
      alert("로그인 실패");
    }
  };

  const logout = async () => {
    try {
      await postLogout();
    } catch (error) {
      console.error("서버 로그아웃 처리 중 오류 발생:", error);
    } finally {
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      localStorage.removeItem("user_info");
  
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
  
      alert("로그아웃 되었습니다.");
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext를 찾을 수 없습니다.");
  }
  return context;
};