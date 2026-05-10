import { useQuery } from "@tanstack/react-query";

import { getLPList } from "../../apis/lp";

const useGetLPList = (
  order: string
) => {
  return useQuery({
    queryKey: ["lps", order],

    queryFn: () =>
      getLPList(order),

    staleTime: 1000 * 30,

    gcTime: 1000 * 60 * 5,
  });
};

export default useGetLPList;