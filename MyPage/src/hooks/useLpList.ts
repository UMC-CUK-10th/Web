import type { LpListResponse } from "../types/Lp";

export async function useLpList(): Promise<LpListResponse> {
    const res = await fetch("http://localhost:8000/v1/lps?cursor=0&limit=9&order=desc", {
        headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error("데이터를 불러오지 못했습니다.");
    const json = await res.json();
    console.log(json.data)
    return json.data;
}