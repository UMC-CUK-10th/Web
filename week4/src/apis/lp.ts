import type { PaginationDto } from "../types/common";
import { axiosInstance } from "./axios";
import type { ResponseCommentListDto, ResponseLpListDto } from "../types/lp";

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

export const getLpDetail = async (lpid: string | undefined) => {
  if (!lpid) {
    return null;
  }
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}`);
  return data;
};

export const getLpComments = async ({
  lpid,
  order,
  cursor,
}: {
  lpid: string;
  order: "asc" | "desc";
  cursor?: number;
}): Promise<ResponseCommentListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}/comments`, {
    params: {
      order,
      cursor,
      limit: 3,
    },
  });

  return data;
};