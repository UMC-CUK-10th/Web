
import type { RequestSigninDto } from "../types/auth";
import { createContext } from "react-router-dom";
import { useContext, useState, type PropsWithChildren } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postSignin, postSignout} from "../apis/auth";


interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (signinData: RequestSigninDto) => Promise<void>;
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
        removeItem: removeAccessTokenFromStorage
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const {
        getItem: getRefreshTokenFromStorage, 
        setItem: setRefreshTokenInStorage, 
        removeItem: removeRefreshTokenFromStorage
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    const [accessToken, setAccessToken] = useState<string | null>(
        getAccessTokenFromStorage()
    );
    const [refreshToken, setRefreshToken] = useState<string | null>(
        getRefreshTokenFromStorage()
    );
    //지연 초기화, 여기에 쓰는 이런 애들까지, 로컬 스토리지에 접근하는 것까지 굳이 계속 렌더링할 필요가 없기 때문에

    const login = async (signinData: RequestSigninDto) => {
        try {
            const { data } = await postSignin(signinData);

            if (data) {
               const newAccessToken = data.accessToken;
               const newRefreshToken = data.refreshToken;

               setAccessTokenInStorage(newAccessToken);
              setRefreshTokenInStorage(newRefreshToken);

               setAccessToken(newAccessToken); //새로 발급된 토큰으로 상태 업데이트 시켜줘야함. 지연초기화니까
               setRefreshToken(newRefreshToken);
               alert("로그인 성공");
          }
        } catch (error) {
            console.error("로그인 오류", error);
            alert("로그인 실패"); 
        }
    };

    const logout = async () => {
        try {
            await postSignout(); // 딱히 반환받을 값이 없어서 await로만 처리
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();
            //로컬스토리지 클리어를 안 하는 이유: 사이트가 커질 경우 다른 다수의 정보가 로컬스토리지에 저장되기 때문에 지울 숭 ㅓㅄ음.
            setAccessToken(null);
            setRefreshToken(null);

            alert("로그아웃 성공");
        } catch (error) {
            console.error("로그아웃 오류", error);
            alert("로그아웃 실패");
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider, AuthContext를 찾을 수 없습니다.");
    }
    return context;
};