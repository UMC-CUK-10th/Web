import type { PaginationDto } from "../types/common";
import type { ResponseLpListDto, ResponseLpDetailDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async(paginationDto: PaginationDto) : Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get('/v1/lps', {
    params: paginationDto,
  });
  return data;
};

export const getLpDetail = async(id: string): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${id}`);
  return data;
};


export const updateLpDetail = async(id: string, body: any): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.patch(`/v1/lps/${id}`, body);
  return data;
};

export const postLpLike = async (lpid: string) => {
  const {data} = await axiosInstance.post(`/v1/lps/${lpid}/likes`);
  return data;
};

export const deleteLpLike = async (lpid: string) => {
  const {data} = await axiosInstance.delete(`/v1/lps/${lpid}/likes`);
  return data;
};