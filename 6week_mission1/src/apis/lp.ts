import { axiosInstance } from "./axios";
import type { PaginationDto } from "../types/common";

// 1. 개별 아이템 타입
export interface LpItem {
  id: number;
  thumbnail: string;
  title: string;
  content: string;
  likeCount: number;
  createdAt: string;
  tags: { id: number; name: string }[];
  likes: { id: number; userId: number; lpId: number }[];
}

// 2. API 전체 응답 타입 (여기서 사용됩니다!)
export interface LpResponse {
  status: boolean;
  message: string;
  data: {
    data: LpItem[];
    nextCursor?: number;
    hasNext: boolean;
  };
}

// 3. 함수의 리턴 타입으로 LpResponse를 지정 (Promise<LpResponse>)
export const getLpList = async ({ 
  cursor, 
  limit, 
  search, 
  order 
}: PaginationDto): Promise<LpResponse> => {
  // 4. Axios 요청 시에도 타입을 넣어줍니다 (<LpResponse>)
  const { data } = await axiosInstance.get<LpResponse>("/v1/lps", {
    params: { 
      cursor: cursor ?? 0, 
      limit: limit ?? 50, 
      search: search || undefined, 
      order 
    },
  });

  return data; 
};

export const getLpDetail = async (lpId: number): Promise<LpItem> => {
  const { data } = await axiosInstance.get<{ data: LpItem }>(`/v1/lps/${lpId}`);
  return data.data;
};

export const likeLp = async (lpId: number) => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
};

export const unlikeLp = async (lpId: number) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
};