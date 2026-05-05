import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { LpResponse } from "../types/LpItem";
import LpCard from "../components/LpCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
    const [sort, setSort] = useState<"asc" | "desc">("asc");

    const { data: response, isLoading } = useQuery<LpResponse>({
        queryKey: ['lps', sort],
        queryFn: () => axios.get(`http://localhost:8000/v1/lps?order=${sort}`).then(res => res.data),
    });

    const lpList = response?.data?.data || [];

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">LP 목록</h1>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as "asc" | "desc")}
                    className="border p-2 rounded-md shadow-sm cursor-pointer"
                >
                    <option value="asc">오래된순 (ASC)</option>
                    <option value="desc">최신순 (DESC)</option>
                </select>
            </div>

            {isLoading ? (
                <LoadingSpinner/>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {lpList.map((lp) => (
                        <LpCard lp={lp}/>
                    ))}
                </div>
            )}
        </div>
    );
}