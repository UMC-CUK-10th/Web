import { createContext, PropsWithChildren, useContext, useState } from "react";
import { RequestSignInDto } from "../../types/auth";
import { postLogout, postSignIn } from "../../api/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY_ACCESS_TOKEN, LOCAL_STORAGE_KEY_REFRESH_TOKEN } from "../constants/key";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (signInData: RequestSignInDto) => Promise<void>;
    logout: () => Promise<void>;
}

// 1. Context 생성
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Provider 컴포넌트 생성
export const AuthProvider = ({ children }: PropsWithChildren) => {
    const {
        getItem: getAccessTokenFromStorage,
        setItem: setAccessTokenToStorage,
        removeItem: removeAccessTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY_ACCESS_TOKEN);

    const {
        getItem: getRefreshTokenFromStorage,
        setItem: setRefreshTokenToStorage,
        removeItem: removeRefreshTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY_REFRESH_TOKEN);

    // Lazy Initialization (지연 초기화) 적용
    const [accessToken, setAccessToken] = useState<string | null>(() => getAccessTokenFromStorage());
    const [refreshToken, setRefreshToken] = useState<string | null>(() => getRefreshTokenFromStorage());

    // 로그인 함수
    const login = async (signInData: RequestSignInDto) => {
        try {
            const { data } = await postSignIn(signInData);
            
            const newAccessToken: string = data.accessToken;
            const newRefreshToken: string = data.refreshToken;

            setAccessTokenToStorage(newAccessToken);
            setRefreshTokenToStorage(newRefreshToken);

            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);
            alert("로그인 성공");
        } catch (error) {
            console.error(error);
            alert("로그인 실패");
        }
    };

    // 로그아웃 함수
    const logout = async () => {
        try {
            await postLogout(); // API 호출 (필요시)
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();
            setAccessToken(null);
            setRefreshToken(null);
            alert("로그아웃 성공");
        } catch (error) {
            console.error("로그아웃 에러", error);
            alert("로그아웃 실패");
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Custom Hook으로 추출
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("어스 콘텍스트를 찾을 수 없습니다.");
    }
    return context;
};