import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { PropsWithChildren } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { RequsetSigninDto, ResponseMyInfoDto } from "../types/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin, getMyInfo } from "../apis/auth";
import { axiosInstance } from "../apis/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AuthContextType {
  accessToken: string | null;
  user: ResponseMyInfoDto['data'] | null;
  login: (signInData: RequsetSigninDto) => void;
  logout: () => void;
  isInitialized: boolean;
  isLoginLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  user: null,
  login: () => {},
  logout: () => {},
  isInitialized: false,
  isLoginLoading: false,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const { setItem: setAccess, removeItem: removeAccess } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { setItem: setRefresh, removeItem: removeRefresh } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<ResponseMyInfoDto['data'] | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: postLogout,
    onSettled: () => {
      removeAccess();
      removeRefresh();
      localStorage.removeItem("userId");
      setAccessToken(null);
      setUser(null);
      delete axiosInstance.defaults.headers.common["Authorization"];
      queryClient.clear();
      window.location.href = "/login";
    }
  });

  const logout = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  const loginMutation = useMutation({
    mutationFn: postSignin,
    onSuccess: async (response) => {
      const result = response.data;
      if (result) {
        const newAccess = (result.accessToken || "").trim();
        const newRefresh = (result.refreshToken || "").trim();

        if (!newAccess) throw new Error("토큰이 없습니다.");

        setAccess(newAccess);
        setRefresh(newRefresh);
        setAccessToken(newAccess);
        
        try {
          const userRes = await getMyInfo();
          setUser(userRes.data);
          localStorage.setItem("userId", String(userRes.data?.id ?? ""));
          window.location.href = "/";
        } catch (e) {
          console.error("유저 정보 로드 실패", e);
        }
      }
    },
    onError: () => {
      alert("로그인 정보를 확인해주세요.");
    }
  });

  useEffect(() => {
    const initAuth = async () => {
      try {
        const savedAccess = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
        if (savedAccess) {
          const cleanToken = savedAccess.replace(/^["']|["']$/g, "").trim();
          setAccessToken(cleanToken);
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${cleanToken}`;
          const response = await getMyInfo();
          setUser(response.data);
          localStorage.setItem("userId", String(response.data?.id ?? ""));
        }
      } catch (error: any) {
        if (error.response?.status === 401) {
          localStorage.clear();
          setAccessToken(null);
          setUser(null);
        }
      } finally {
        setIsInitialized(true);
      }
    };
    initAuth();
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        accessToken, 
        user, 
        login: loginMutation.mutate, 
        logout, 
        isInitialized,
        isLoginLoading: loginMutation.isPending 
      }}
    >
      {isInitialized ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);