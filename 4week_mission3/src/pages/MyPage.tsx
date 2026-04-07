import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";

const MyPage = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyInfo();
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!data) return <div>로딩 중...</div>;

  return (
    <div>
      <h1>마이 페이지</h1>
      <p>이름: {data.name}</p>
      <p>이메일: {data.email}</p>
    </div>
  );
};

export default MyPage;