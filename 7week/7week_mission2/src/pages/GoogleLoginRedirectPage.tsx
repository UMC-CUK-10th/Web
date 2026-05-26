import { useEffect } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const GoogleLoginRedirectPage = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

    if (accessToken) {
      localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, accessToken.trim());
      
      if (refreshToken) {
        localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, refreshToken.trim());
      }

      window.location.href = "/"; 
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center font-bold text-lg">
      로그인 정보를 확인 중입니다...
    </div>
  );
};

export default GoogleLoginRedirectPage;