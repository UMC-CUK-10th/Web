import {
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { RequestSigninDto, ResponseMyInfoDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { getMyInfo, postLogout, postSignin } from "../apis/auth";
import { AuthContext } from "./auth-context";

type User = ResponseMyInfoDto["data"];

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenFromStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenFromStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage()
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const syncUserInfo = async () => {
      try {
        const response = await getMyInfo();

        if (response.data) {
          setUser(response.data);
        }
      } catch {
        alert("사용자를 불러오지 못했습니다.");
      }
    };

    syncUserInfo();
  }, [accessToken]);

  const login = async (signInData: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signInData);

      if (data) {
        const newAccessToken = data.accessToken;
        const newrefreshToken = data.refreshToken;

        setAccessTokenFromStorage(newAccessToken);
        setRefreshTokenFromStorage(newrefreshToken);

        setAccessToken(newAccessToken);
        setRefreshToken(newrefreshToken);
        alert("로그인 성공");
        return true;
      }
    } catch (error) {
      console.log(error);
      alert("로그인 실패");
      return false;
    }

    return true;
  };

  const logout = async () => {
    try {
      await postLogout();
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();

      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);

      alert("로그아웃됨");
    } catch (error) {
      console.log(error);
      alert("로그아웃 실패");
    }
  };

  const setAuthTokens = (
    newAccessToken: string,
    newRefreshToken: string | null
  ) => {
    setAccessTokenFromStorage(newAccessToken);
    setAccessToken(newAccessToken);

    if (newRefreshToken) {
      setRefreshTokenFromStorage(newRefreshToken);
      setRefreshToken(newRefreshToken);
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, login, logout, setAuthTokens, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
