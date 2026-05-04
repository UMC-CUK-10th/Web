// src/context/AuthContext.tsx

import { postLogout, postSignin } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constans/key"
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { RequestSigninDto } from "../types/auth";
import { createContext, type PropsWithChildren, useContext, useState } from "react";
import { toast } from "react-hot-toast";

interface AuthContextType {
    accessToken: string|null;
    refreshToken: string|null;
    login:(signinData: RequestSigninDto) => Promise<void>;
    logout:() => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({children}:PropsWithChildren) => {
    const{getItem : getAccessTokenFromStorage,
          setItem : setAccessTokenInStorage, 
          removeItem : removeAccessTokenFromStorage
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

    const{getItem : getRefreshTokenFromStorage, 
          setItem : setRefreshTokenInStorage, 
          removeItem : removeRefreshTokenFromStorage
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    const[accessToken, setAccessToken] = useState<string|null>(
    getAccessTokenFromStorage(), 
    );
    const[refreshToken, setRefreshToken] = useState<string|null>(
    getRefreshTokenFromStorage(),
    );

    const login = async(signinData : RequestSigninDto) => {
        try{
            const response = await postSignin(signinData);
            const data = response.data;

            console.log('응답 데이터 :', data)
            if(data){
                const newAccessToken = data.accessToken;
                const newRefreshToken = data.refreshToken;
                
                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);

                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);
                toast.success("로그인 성공");
                window.location.href="/my";
            }
        } catch (error) {
            console.log("로그인 오류", error)
            toast.error("아이디나 비밀번호를 다시 확인해주세요");
        }
    };

    const logout = async() => {
        try {
            await postLogout();
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();

            setAccessToken(null);
            setRefreshToken(null);

            alert("로그아웃 성공")
            window.location.href = "/my";
        } catch (error){
            console.log("로그아웃 오류", error);
            alert("로그아웃 실패")
        }
    };

    return (
        <AuthContext.Provider value={{login, logout, accessToken, refreshToken}}>
            {children}
        </AuthContext.Provider>
    );
};

// hook으로 만듦
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("AuthContext를 찾을 수 없습니다.");
    }
    return context;
}