import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { RequestSigninDto, ResponseSigninDto } from "../types/auth";
import { postLogout, postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

type AuthUser = Pick<ResponseSigninDto["data"], "id" | "name">;

interface AuthContextType {
    user: AuthUser | null;
    accessToken: string | null;
    refreshToken: string | null;
    login: (signInData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const {
        getItem: getAccessTokenFromStorage,
        setItem: setAccessTokenToStorage,
        removeItem: removeAccessTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

    const {
        getItem: getRefreshTokenFromStorage,
        setItem: setRefreshTokenToStorage,
        removeItem: removeRefreshTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    const [accessToken, setAccessToken] = useState<string | null>(() => getAccessTokenFromStorage());
    const [refreshToken, setRefreshToken] = useState<string | null>(() => getRefreshTokenFromStorage());
    const [user, setUser] = useState<AuthUser | null>(null);

    const login = async (signInData: RequestSigninDto) => {
        try {
            const response = await postSignin(signInData);
            
            const newAccessToken = response.data.accessToken;
            const newRefreshToken = response.data.refreshToken;

            setAccessTokenToStorage(newAccessToken);
            setRefreshTokenToStorage(newRefreshToken);

            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);
            setUser({ id: response.data.id, name: response.data.name });
            alert("로그인 성공");
        } catch (error) {
            console.error(error);
            alert("로그인 실패");
        }
    };

    const logout = async () => {
        try {
            await postLogout();
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();
            setAccessToken(null);
            setRefreshToken(null);
            setUser(null);
            alert("로그아웃 성공");
        } catch (error) {
            console.error("로그아웃", error);
            alert("로그아웃 실패");
        }
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, refreshToken, login, logout }}>
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