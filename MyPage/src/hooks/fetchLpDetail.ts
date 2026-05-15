import type { LpResponse } from "../types/Lp";

export async function fetchLpDetail(id: number): Promise<LpResponse> {
    const res = await fetch(`http://localhost:8000/v1/lps/${id}`, {
        headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error("데이터를 불러오지 못했습니다.");
    const json = await res.json();
    return json.data;
}