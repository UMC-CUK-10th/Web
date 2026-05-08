import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({cursor,search,order,limit,sort}:PaginationDto){
    return useQuery({
        queryKey:[QUERY_KEY.lps,search,order,sort],
        queryFn: () => getLpList({
            cursor,
            search,
            order,
            limit,
            sort,
        }),

        
        staleTime : 5 * 60 * 1000, // 5분

        
        gcTime : 10 * 60 * 1000, // 10분

        

        select: (data) => data.data.data,
        
    });
}


export default useGetLpList;