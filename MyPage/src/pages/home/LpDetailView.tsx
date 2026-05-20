import { useParams } from "react-router-dom";
import { useLp } from "../../hooks/useLp";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useState } from "react";
import LpCommentsModal from "./LpCommentsModal";
import LpLikeButton from "../../components/Lp/LpLikeButton";

export default function LpDetailView() {
    const { id } = useParams();
    const { data, isLoading, isError } = useLp(id);

    const [isOpenCommentModal, setIsOpenCommentModal] = useState(false);

    if (isLoading) return <LoadingSpinner title="데이터를 불러오고 있습니다"/>
    if (isError) return <div>데이터를 불러오지 못했습니다.</div>;

    return (
        <div className="min-h-screen py-12 px-4">
            { data && (
                <div className="
                    max-w-sm mx-auto"
                >
                    <div className="relative group">
                        <img className="
                            w-full aspect-square object-cover rounded-2xl
                            shadow-lg transition-transform duration-300
                            group-hover:scale-[1.01]" 
                            src={data.thumbnail} 
                            alt={data.title}
                        />
                    </div>

                    <div className="mt-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{data.title}</h1>
                    
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {data.tags.map((tag, index) => (
                                <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                                    #{tag.name}
                                </span>
                            ))}
                        </div>

                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {data.content}
                        </p>

                        <div className="flex items-center justify-center gap-4 pt-6">
                            <LpLikeButton lp={data}/>
                            <button className="bg-blue-400 text-white 
                                rounded-lg py-2 w-full
                                text-sm font-medium
                                hover:bg-blue-500 transition"
                                onClick={() => isOpenCommentModal ? setIsOpenCommentModal(false) : setIsOpenCommentModal(true)}
                            >
                                <span className="text-lg">댓글</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            { isOpenCommentModal && id && (
                <LpCommentsModal lpId={Number(id)} onClose={() => setIsOpenCommentModal(false)}/>
            )}
        </div>
    );
}
