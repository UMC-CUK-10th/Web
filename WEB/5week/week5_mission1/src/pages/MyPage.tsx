import { useState, useEffect } from "react";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getMyInfo();
                console.log(response);
                setData(response);
            } catch (error) {
                console.error("정보를 가져오는데 실패했습니다.", error);
            }
        };
        getData();
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/");
    }

    if (!data) return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-transparent">
            <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin mb-4" />
            <p className="text-slate-400 font-medium animate-pulse">꿀 정보를 가져오는 중...</p>
        </div>
    );
    
    return (
        <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 bg-transparent">
            <div className="w-full max-w-[400px] bg-white p-10 rounded-[32px] shadow-2xl shadow-emerald-900/5 border border-emerald-50 flex flex-col items-center animate-in fade-in zoom-in duration-500">
                
                {/* 상단 뱃지 */}
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-6 border border-emerald-100">
                    My Profile
                </span>

                {/* 프로필 이미지 영역 */}
                <div className="relative mb-6">
                    {data.data.avatar ? (
                        <img
                            src={data.data.avatar as string}
                            alt="프로필"
                            className="w-28 h-28 rounded-[40px] object-cover ring-4 ring-white shadow-lg border border-emerald-50"
                        />
                    ) : (
                        <div className="w-28 h-28 rounded-[40px] bg-emerald-50 flex items-center justify-center ring-4 ring-white shadow-lg border border-emerald-100">
                            <span className="text-5xl">👤</span>
                        </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-8 h-8 rounded-xl border-4 border-white flex items-center justify-center shadow-sm">
                        <span className="text-[10px]">✨</span>
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-black text-slate-900 mb-1">
                        {data.data.name}
                    </h1>
                    <p className="text-slate-400 text-sm font-medium">
                        {data.data.email}
                    </p>
                </div>

                <div className="w-full grid grid-cols-2 gap-3 mb-8">
                    <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</p>
                        <p className="text-sm font-black text-emerald-600">Active</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Member</p>
                        <p className="text-sm font-black text-slate-700">Family</p>
                    </div>
                </div>

                {/* 로그아웃 버튼 */}
                <button
                    onClick={handleLogout}
                    className="w-full py-4 rounded-2xl text-sm font-black transition-all shadow-lg
                        bg-white text-slate-400 border border-slate-100 hover:bg-red-50 hover:text-red-500 hover:border-red-100 active:scale-95"
                >
                    로그아웃
                </button>

                {/* 푸터 문구 */}
                <p className="mt-8 text-[11px] text-slate-300 font-medium">
                    GGULBEOM Hub • Version 1.0.0
                </p>
            </div>
        </div>
    );
};

export default Mypage;