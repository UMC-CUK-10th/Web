import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import API from "../lib/axios";

export default function Profile() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const handleWithdraw = async () => {
        const confirmResult = window.confirm("정말로 탈퇴하시겠습니까? 모든 정보가 삭제됩니다.");
        if (confirmResult) {
            await API.delete("/users")
            localStorage.clear();
            setUser(null);
            alert("탈퇴 처리가 완료되었습니다.");
            navigate("/");
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 p-6">
            {user ? (
                <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 transition-all hover:shadow-md">
                    {/* 상단 프로필 헤더 */}
                    <div className="flex flex-col items-center mb-8">
                        
                        <h2 className="text-2xl font-bold text-gray-900">{user.name} 님의 프로필</h2>
                        <p className="text-gray-500 text-sm">기본 계정 정보</p>
                    </div>

                    {/* 정보 리스트 */}
                    <div className="space-y-4 mb-10">
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                            <span className="text-gray-500 font-medium">이름</span>
                            <span className="text-gray-900 font-bold">{user.name}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                            <span className="text-gray-500 font-medium">아이디</span>
                            <span className="text-gray-900 font-mono text-sm">{user.id}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                            <span className="text-gray-500 font-medium">이메일</span>
                            <span className="text-gray-900 font-mono text-sm">{user.email}</span>
                        </div>
                    </div>


                    <div className="pt-6 border-t border-gray-100">
                        <button 
                            onClick={handleWithdraw}
                            className="
                                group
                                flex items-center justify-center gap-2
                                w-full py-3
                                text-red-500 font-semibold
                                bg-red-50 rounded-xl
                                transition-all duration-200
                                hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-200
                                active:scale-95
                            "
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            회원 탈퇴하기
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-4">
                            탈퇴 시 데이터 복구가 불가능합니다.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-gray-500 mb-4">로그인 정보가 없습니다.</p>
                    <button 
                        onClick={() => navigate("/login")}
                        className="text-gray-900 font-bold underline underline-offset-4"
                    >
                        로그인하러 가기
                    </button>
                </div>
            )}
        </div>
    );
}