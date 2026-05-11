import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';
import type { RequestSigninDto } from '../types/auth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../constants/key';
import { postLogout, postSignin } from '../apis/auth';

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signInData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
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

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage(),
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage(),
  );

  const login = async (signinData: RequestSigninDto) => {
    try {
      const response = await postSignin(signinData);

      if (response) {
        const { accessToken, refreshToken, id } = response.data;

        localStorage.setItem('userId', String(id));

        setAccessTokenInStorage(accessToken);
        setRefreshTokenInStorage(refreshToken);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        window.location.href = '/my';
      }
    } catch (error) {
      console.error(error);
      alert('아이디 또는 비밀번호를 확인해주세요.');
    }
  };

  const logout = async () => {
    try {
      await postLogout();
    } catch (error) {
      console.error('서버 로그아웃 오류(무시하고 진행):', error);
    } finally {
      localStorage.removeItem('userId');

      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      setAccessToken(null);
      setRefreshToken(null);

      alert('로그아웃 되었습니다.');

      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context: AuthContextType = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthContext를 찾을 수 없습니다.');
  }
  return context;
};
