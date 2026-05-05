import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LOCAL_STORAGE_KEY } from "../constants/key"; // 상수를 불러옵니다.

const GoogleLoginRedirectPage = () => {
  // 1. AuthContext에서 제공하는 함수 이름이 정확한지 확인하세요.
  // 만약 AuthContext에서 'setItem' 등으로 내보냈다면 그 이름을 써야 합니다.
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    if (accessToken) {
      // 2. AuthContext의 토큰 변경 함수 호출
      // 만약 여기서 에러가 난다면 auth.setAccessToken이 존재하는지 확인!
      if (auth && auth.setAccessToken) {
        auth.setAccessToken(accessToken);
        
        // 3. 리프레시 토큰은 필요 시 로컬스토리지에 직접 저장
        if (refreshToken) {
          localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, refreshToken);
        }
        
        console.log("구글 로그인 성공!");
        navigate("/", { replace: true });
      }
    } else {
      console.error("토큰이 없습니다.");
      navigate("/login", { replace: true });
    }
  }, [auth, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <p className="animate-pulse">로그인 정보를 확인 중입니다...</p>
      </div>
    </div>
  );
};

export default GoogleLoginRedirectPage;