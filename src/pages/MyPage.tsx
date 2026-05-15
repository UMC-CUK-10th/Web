import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";

const MyPage = () => {
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);

    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        };

        getData();
    }, []);
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-white">
            {data?.data.name}님의 마이페이지입니다. <br />
             이메일 : {data?.data.email}
        </div>
    );
};

export default MyPage;