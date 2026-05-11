import type { PaginationDto } from "../types/common";
import type { ResponseLpListDto, ResponseLpDetailDto } from "../types/lp"; // 상세 타입 추가 가정
import { axiosInstance } from "./axios";

// 1. LP 리스트 가져오기 (기존)
export const getLpList = async(paginationDto: PaginationDto) : Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get('/v1/lps', {
    params: paginationDto,
  });
  return data;
};

// 2. LP 상세 정보 가져오기 (추가)
export const getLpDetail = async(id: string): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${id}`);
  return data;
};

// 3. LP 정보 수정하기 (추가)
// body 타입은 프로젝트에서 정의한 DTO가 있다면 그걸 사용하세요.
export const updateLpDetail = async(id: string, body: any): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.patch(`/v1/lps/${id}`, body);
  return data;
};