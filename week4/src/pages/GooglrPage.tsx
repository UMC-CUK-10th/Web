import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const GooglePage = () => {
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );
  const { setItem: setUserName } = useLocalStorage(LOCAL_STORAGE_KEY.userName);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);
    const userName = urlParams.get(LOCAL_STORAGE_KEY.userName);

    if (accessToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      if (userName) {
        setUserName(userName);
      }
      window.location.href = "/mypage";
    }
  }, [setAccessToken, setRefreshToken, setUserName]);
  
  return <div>구글 화면</div>;
};

export default GooglePage;
