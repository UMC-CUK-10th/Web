import { useQuery } from "@tanstack/react-query";

import { getLPDetail } from "../../apis/lp";

const useGetLPDetail = (
  id: string
) => {
  return useQuery({
    queryKey: ["lp", id],

    queryFn: () =>
      getLPDetail(id),
  });
};

export default useGetLPDetail;