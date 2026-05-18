import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto>([] as unknown as ResponseMyInfoDto);

    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        };

        getData();
    }, []);

    const handleLogout = async() => {
        await logout();
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-white">
            <h1> {data.data?.name}님의 마이페이지입니다. </h1>
            <img src={data.data?.avatar as string} alt="프로필 이미지" className="w-24 h-24 rounded-full border-2 border-white" /> <br />
             <h1>이메일 : {data.data?.email} </h1>
             {/* 렌더링할 때 data가 null일 수 있기 때문에 optional chaining 사용 */}

             <button onClick={handleLogout} className="cursor-pointer mt-4 bg-red-500 text-white py-2 px-4 rounded-sm hover:bg-red-700 transition-colors">
                로그아웃
            </button>
        </div>
    );
};

export default MyPage;