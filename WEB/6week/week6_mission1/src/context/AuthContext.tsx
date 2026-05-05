import {
  createContext,
  useContext,
  useState,
  useEffect,
  type PropsWithChildren,
} from "react";
import type { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin } from "../apis/auth";
import { axiosInstance } from "../apis/axios";

// 1. 타입을 업데이트하여 외부에서 토큰을 설정할 수 있게 합니다.
interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  userName: string | null;
  isLoading: boolean;
  login: (signInData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
  setAccessToken: (token: string | null) => void; // 추가
  setRefreshToken: (token: string | null) => void; // 추가
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

  const [accessToken, setAccessTokenState] = useState<string | null>(
    getAccessTokenFromStorage(),
  );

  const [refreshToken, setRefreshTokenState] = useState<string | null>(
    getRefreshTokenFromStorage(),
  );

  const [userName, setUserName] = useState<string | null>(
    localStorage.getItem("userName"),
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 구글 로그인 등 외부에서 토큰을 설정할 때 사용할 함수들
  const setAccessToken = (token: string | null) => {
    if (token) {
      setAccessTokenInStorage(token);
      setAccessTokenState(token);
    } else {
      removeAccessTokenFromStorage();
      setAccessTokenState(null);
    }
  };

  const setRefreshToken = (token: string | null) => {
    if (token) {
      setRefreshTokenInStorage(token);
      setRefreshTokenState(token);
    } else {
      removeRefreshTokenFromStorage();
      setRefreshTokenState(null);
    }
  };

  // 사용자 정보 가져오기 로직 (토큰이 생기면 자동으로 실행)
  useEffect(() => {
    const fetchAndSetUserName = async () => {
      if (accessToken && !userName) {
        try {
          const { data } = await axiosInstance.get("/v1/users/me");
          const fetchedName = data.data?.nickname || data.data?.name || "회원";

          setUserName(fetchedName);
          localStorage.setItem("userName", fetchedName);
        } catch (error) {
          console.error("사용자 정보 로드 실패:", error);
        }
      }
    };

    fetchAndSetUserName();
  }, [accessToken, userName]);

  const login = async (signinData: RequestSigninDto) => {
    setIsLoading(true);
    try {
      const { data } = await postSignin(signinData);

      if (data) {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        
        const fetchedName = data.name || "회원";
        setUserName(fetchedName);
        localStorage.setItem("userName", fetchedName);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await postLogout();
    } catch (error) {
      console.error(error);
    } finally {
      setAccessToken(null);
      setRefreshToken(null);
      setUserName(null);
      localStorage.removeItem("userName");
      setIsLoading(false);
      alert("로그아웃 되었습니다.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ 
        accessToken, 
        refreshToken, 
        userName, 
        isLoading, 
        login, 
        logout,
        setAccessToken, // value에 추가
        setRefreshToken  // value에 추가
      }}
    >
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