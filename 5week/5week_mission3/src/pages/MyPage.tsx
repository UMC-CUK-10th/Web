import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";

const MyPage = () => {
  const {logout} =useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null >(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        setData(response); 
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    getData();
  }, []);

  const handleLogout = async() => {
    await logout();
  };

  return (
    <div>
      <h1>{data?.data?.name}님 환영합니다.</h1>
      <img src={data?.data?.avatar as string} alt={"구글 로고"}/>
      <h1>{data?.data?.email}</h1>
      
      <button className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-95" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  ); 
};

export default MyPage;