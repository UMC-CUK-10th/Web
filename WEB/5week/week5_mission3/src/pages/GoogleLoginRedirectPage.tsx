import { useEffect } from "react";
import { LOCAL_STORAGE_KEY } from "../constans/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

const GoogleLoginRedirectPage = () => {
    const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("accessToken");
        const refreshToken = urlParams.get("refreshToken");

        if (accessToken) {
            setAccessToken(accessToken);
            if (refreshToken) {
                setRefreshToken(refreshToken);
            }
            
            window.location.href = "/my";
        }
    }, [setAccessToken, setRefreshToken]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin mb-4" />
            <p className="text-slate-500 font-medium">로그인 처리 중입니다...</p>
        </div>
    );
}

export default GoogleLoginRedirectPage;