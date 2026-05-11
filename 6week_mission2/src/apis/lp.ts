import { axiosInstance } from "./axios";
import type { PaginationDto } from "../types/common"; 

export interface Lp {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  likeCount: number;
  createdAt: string;
  tags: { id: number; name: string }[];
  likes: { id: number; userId: number; lpId: number }[];
}

export const getLpList = async ({ cursor, limit, search, order }: PaginationDto) => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: { 
      cursor: cursor ?? 0, 
      limit: limit ?? 50, 
      search: search || undefined, 
      order 
    },
  });

  return data; 
};

export const getLpDetail = async (lpId: number) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
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