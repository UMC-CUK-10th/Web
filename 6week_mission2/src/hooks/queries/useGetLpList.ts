import { useQuery } from '@tanstack/react-query';
import { getLpList } from '../../apis/lp';
import type { PaginationDto } from '../../types/common';
import { queryKey } from '../../constants/queryKey';

export interface Tag {
  id: number;
  name: string;
}

export interface LpItem {
  id: number;
  thumbnail: string;
  title: string;
  tags?: Tag[];
}

// API가 주는 전체 응답의 형태 (백엔드 구조에 맞게 정의)
export interface LpResponse {
  status: boolean;
  message: string;
  data: {
    data: LpItem[];
    nextCursor?: number;
    hasNext?: boolean;
  };
}

export const useGetLpList = ({ cursor, limit, search, order }: PaginationDto) => {
  return useQuery({
    queryKey: [queryKey.lps, search, order],
    queryFn: () => getLpList({ cursor, limit, search, order }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    // select 부분을 아래처럼 수정해보세요.
    select: (response: any) => {
      // 1. 만약 데이터가 안 나온다면 브라우저 콘솔(F12)을 확인해보세요.
      console.log("실제 API 응답 구조:", response); 

      // 2. 백엔드에서 data.data 안에 배열을 주는지, 아니면 data 안에 바로 주는지 확인이 필요합니다.
      // 보통은 response.data.data에 배열이 들어있습니다.
      return response?.data?.data || response?.data || [];
    },
  });
};