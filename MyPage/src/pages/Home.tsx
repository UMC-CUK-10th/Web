import { useState } from "react";
import LpList from "../components/LpList";

export default function Home() {
    const [sort, setSort] = useState<"asc" | "desc">("asc");

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

            <LpList sort={sort}/>
        </div>
    );
}