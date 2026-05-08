import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { type ResponseMyInfoDto } from "../types/auth";

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      setData(response);
    };

    getData();
  }, []);

  return (
    <section className="w-full">
      <div className="rounded-[32px] bg-white/75 p-8 shadow-xl ring-1 ring-rose-200 backdrop-blur">
        <h1 className="text-2xl font-black text-rose-950">마이페이지</h1>
        <p className="mt-3 text-base text-rose-900/70">
          {data?.data.name ? `${data.data.name}님 환영합니다.` : "회원 정보를 불러오는 중입니다."}
        </p>
      </div>
    </section>
  );
};

export default MyPage;
