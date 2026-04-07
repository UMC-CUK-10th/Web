import { useEffect, useState } from "react";

const HomePage = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("username"); // 로그인 시 저장한 이름
    if (storedName) setUsername(storedName);
  }, []);

  return (
    <div className="text-center mt-20 text-2xl">
      {username ? `${username}님, 환영합니다!` : "홈페이지"}
    </div>
  );
};

export default HomePage;