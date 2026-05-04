import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const accessToken = params.get("accessToken");
    const userId = params.get("userId");
    const name = params.get("name");
    const email = params.get("email");

    if (!accessToken) {
      navigate("/");
      return;
    }

    // 1. 토큰 저장
    localStorage.setItem("accessToken", accessToken);

    // 2. 상태 저장 (🔥 중요)
    setUser({
      id: Number(userId),
      name: name || "",
      email: email || "",
    });

    // 3. 이동
    navigate("/mypage", { replace: true });
  }, []);

  return <div>로그인 처리 중...</div>;
};

export default GoogleCallback;