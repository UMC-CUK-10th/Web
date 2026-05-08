import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../types/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

const HomePage = () => {
  const [search] = useState("");

  const { data, isFetching, hasNextPage, isPending, fetchNextPage, isError } = useGetInfiniteLpList(
    10, 
    search, 
    PAGINATION_ORDER.desc
  );

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return <div className="mt-20 text-center font-bold text-red-500">Error...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isPending && <LpCardSkeletonList count={20} />}

        {data?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => <LpCard key={lp.id} lp={lp} />)}
          
        {isFetching && !isPending && <LpCardSkeletonList count={4} />}
      </div> 
      
      <div ref={ref} className="h-10 w-full" />
    </div>
  );
};


export default HomePage;