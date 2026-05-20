import type { LpFormData, ImageUploadResponse } from "../types/LpFormData";

export async function createLp(data: LpFormData): Promise<void> {
    const token = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);

    let imageUrl = "";

    if (data.thumbnail) {
        // 1. 이미지 업로드 요청 후 url 받아오기
        const imageFormData = new FormData();
        imageFormData.append("file", data.thumbnail);

        const res = await fetch("http://localhost:8000/v1/uploads", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: imageFormData,
        });

        if (!res.ok) throw new Error("이미지 업로드에 실패했습니다.");

        const imageData: ImageUploadResponse = await res.json();
        imageUrl = imageData.data.imageUrl;
    }

    // 2. 서버로 보낼 데이터
    const finalData = {
        title: data.title,
        content: data.content,
        thumbnail: imageUrl,
        tags: data.tags,
        published: true
    }

    const res = await fetch("http://localhost:8000/v1/lps", {
        method: "POST",
        headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
    });

    if (!res.ok) {
        const errorDetail = await res.json(); // 서버가 보내준 구체적인 에러 객체
        console.error("서버 에러 상세:", errorDetail); 
        throw new Error(errorDetail.message || "LP 추가에 실패했습니다.");
    }
}