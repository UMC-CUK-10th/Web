import type { PagnationDto } from '../types/common.ts';
import type { ResponseLpListDto } from '../types/lp.ts';
import { axiosInstance } from './axios.ts';

export const getLpList = async (
  paginationDto: PagnationDto,
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get('/v1/lps', {
    params: paginationDto,
  });

  return data;
};
