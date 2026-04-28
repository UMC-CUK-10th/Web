import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import { getUsersMe } ... 등

export const MyPage = () => {
    const [userData, setUserData] = useState<any>(null);
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // 기존의 내 정보 조회 API 호출 로직
        // ...
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/"); // 로그아웃 후 홈으로 리다이렉트
    };

    return (
        <div>
            {/* Optional Chaining(?.)을 통해 렌더링 전 undefined 에러 방지 */}
            <h1>환영합니다 {userData?.name}님</h1>
            <p>{userData?.email}</p>

            <button 
                onClick={handleLogout}
                className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90"
            >
                로그아웃
            </button>
        </div>
    );
};

export default MyPage;