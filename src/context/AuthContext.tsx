import { createContext, useContext, useState, type PropsWithChildren } from "react";
<<<<<<< HEAD
=======
import type { RequestSigninDto } from "../types/auth";
import { postLogout, postSignin } from "../apis/auth";
>>>>>>> upstream/체컵/고원준
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
<<<<<<< HEAD
    setAccessToken: (token: string | null) => void;
    setRefreshToken: (token: string | null) => void;
=======
    login: (signInData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
>>>>>>> upstream/체컵/고원준
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
<<<<<<< HEAD
    setAccessToken: () => {},
    setRefreshToken: () => {},
=======
    login: async () => {},
    logout: async () => {},
>>>>>>> upstream/체컵/고원준
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

<<<<<<< HEAD
    const [accessToken, setAccessTokenState] = useState<string | null>(() => getAccessTokenFromStorage());
    const [refreshToken, setRefreshTokenState] = useState<string | null>(() => getRefreshTokenFromStorage());

    const setAccessToken = (token: string | null) => {
        if (token) {
            setAccessTokenToStorage(token);
        } else {
            removeAccessTokenFromStorage();
        }
        setAccessTokenState(token);
    };

    const setRefreshToken = (token: string | null) => {
        if (token) {
            setRefreshTokenToStorage(token);
        } else {
            removeRefreshTokenFromStorage();
        }
        setRefreshTokenState(token);
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, setAccessToken, setRefreshToken }}>
=======
    const [accessToken, setAccessToken] = useState<string | null>(() => getAccessTokenFromStorage());
    const [refreshToken, setRefreshToken] = useState<string | null>(() => getRefreshTokenFromStorage());

    const login = async (signInData: RequestSigninDto) => {
        try {
            const response = await postSignin(signInData);
            
            const newAccessToken = response.data.accessToken;
            const newRefreshToken = response.data.refreshToken;

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

    const logout = async () => {
        try {
            await postLogout();
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();
            setAccessToken(null);
            setRefreshToken(null);
            alert("로그아웃 성공");
        } catch (error) {
            console.error("로그아웃", error);
            alert("로그아웃 실패");
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
>>>>>>> upstream/체컵/고원준
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