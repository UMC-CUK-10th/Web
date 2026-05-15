import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "../../context/UserContext";
import { useLpList } from "../../hooks/useLpList";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import { useState } from "react";
import FloatingButton from "../../components/FloatingButton";
import LpModal from "../../components/Lp/LpModal";
import { createLp } from "../../hooks/createLp";
import LpCard from "../../components/Lp/LpCard";

export default function ContentView() {
    const { user } = useUserContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["lps"],
        queryFn: () => useLpList(),
        enabled: !!user
    });

    const queryClient = useQueryClient();

    const { mutate: addLp, isPending } = useMutation({
        mutationFn: createLp,
        onSuccess: () => {
            console.log("데이터 저장 성공")
            queryClient.invalidateQueries({ queryKey: ["lps"] }) // 목록 자동 갱신
            setIsModalOpen(false);
        },
        onError: (error) => {
            alert(error.message);
        }
    });

    if (isLoading) return <LoadingSpinner title="데이터를 불러오고 있습니다..."/>
    if (isError) return <ErrorMessage message="데이터를 불러오지 못했습니다." />

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {data?.data.map((lp) => (
                <LpCard key={lp.id} lp={lp}/>
            ))}
            <FloatingButton onClick={() => setIsModalOpen(true)} />
            { isModalOpen && (
                <LpModal 
                    onClose={() => setIsModalOpen(false)} 
                    onSubmit={addLp}
                    isPending={isPending}
                />
            )}
        </div>
    )
}