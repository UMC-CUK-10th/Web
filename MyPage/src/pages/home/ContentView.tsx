import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "../../context/UserContext";
import { useState, useEffect } from "react";

import { useLps } from "../../hooks/useLps";
import { useLpsByTag } from "../../hooks/useLpsByTag";
import { createLp } from "../../hooks/createLp";

import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import FloatingButton from "../../components/FloatingButton";
import LpModal from "../../components/Lp/LpModal";
import LpCard from "../../components/Lp/LpCard";
import LpSearchBar from "../../components/Lp/LpSearchBar";

export default function ContentView() {
    const { user } = useUserContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tag, setTag] = useState('');
    const [debounceTag, setDebounceTag] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => setDebounceTag(tag), 300);
        return () => clearTimeout(timer);
    }, [tag]);

    const lpResult = useLps(!debounceTag && !!user);
    const tagResult = useLpsByTag(debounceTag);

    const { data, isLoading, isError } = debounceTag ? tagResult : lpResult;

    const lps = data?.pages.flatMap(page => page.data) ?? [];

    const queryClient = useQueryClient();

    const { mutate: addLp, isPending } = useMutation({
        mutationFn: createLp,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["lps"] });
            setIsModalOpen(false);
        },
        onError: (error) => {
            alert(error.message);
        }
    });

    return (
        <div className="flex flex-col h-screen w-full">
            {/* 고정 검색바 */}
            <div className="px-16 py-8 w-full">
                <LpSearchBar value={tag} onChange={setTag} />
            </div>

            {/* 그리드 뷰 */}
            <div className="grid grid-cols-3 gap-4">
                { lps.map((lp) => (
                    <LpCard key={lp.id} lp={lp}/>
                ))}
            </div>

            {/* 플로팅 버튼 */}
            <FloatingButton onClick={() => setIsModalOpen(true)} />
            { isModalOpen && (
                <LpModal 
                    onClose={() => setIsModalOpen(false)} 
                    onSubmit={addLp}
                    isPending={isPending}
                />
            )}
        </div>
        // <div className="flex flex-col gap-4 p-4">
        //     <input
        //         className="border rounded-lg px-3 py-2 text-sm w-64"
        //         placeholder="태그를 입력해주세요."
        //         value={tag}
        //         onChange={(e) => setTag(e.target.value)}
        //     />
        //     <div className="grid grid-cols-3 gap-4">
        //         { lps.map((lp) => (
        //             <LpCard key={lp.id} lp={lp}/>
        //         ))}
        //     </div>
        //     <FloatingButton onClick={() => setIsModalOpen(true)} />
        //     { isModalOpen && (
        //         <LpModal 
        //             onClose={() => setIsModalOpen(false)} 
        //             onSubmit={addLp}
        //             isPending={isPending}
        //         />
        //     )}
        // </div>
    )
}