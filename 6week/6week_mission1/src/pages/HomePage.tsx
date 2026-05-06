import { useEffect, useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../types/common";
import { useInView } from "react-intersection-observer";

const HomePage = () => {
  const [search, setSearch] = useState("");
  // const{data,inPending,isError} = useGetLpList({
  //   search,
  //   limit: 50,
  // });

  const { data, isFetching, hasNextPage, isPending, fetchNextPage, isError } = useGetInfiniteLpList(10, search, PAGINATION_ORDER.desc);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return <div className={"mt-20"}>Loading...</div>;
  }

  if (isError) {
    return <div className={"mt-20"}>Error...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <input value={search} onChange={(e)=> setSearch(e.target.value)}/>

      <div className={"grid grid-cols-1 sm: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
        {data?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <div key={lp.id} className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img src={lp.thumbnail} alt={lp.title} className="object-cover w-full h-48"/>
              <div className="absolute bottom=0 left-0 right-0 bg-black bg-capacity-75 p-2">
                <h3 className="text-white text-sm font-semibold">{lp.title}</h3>
              </div>
            </div>
          ))}
      </div>
      <div ref={ref}>{isFetching && <div>Loading...</div>}</div>
    </div>
  );
};

export default HomePage;