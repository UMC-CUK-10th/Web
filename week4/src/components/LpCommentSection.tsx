import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useGetLpComments from "../hooks/useGetLpComments";
import LpCommentForm from "./LpCommentForm.tsx";
import CommentSkeleton from "./LpCommentSkeleton.tsx";
import ErrorDisplay from "./ErrorDisplay.tsx";

interface Props {
  lpid: string;
}

const LpCommentSection = ({ lpid }: Props) => {
  const [order, setOrder] = useState<"desc" | "asc">("desc");

  const {
    data: comments,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
  } = useGetLpComments(lpid, order);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return <ErrorDisplay />;
  }

  return (
    <div className="mt-2 text-rose-900">
      <h2 className="mb-4 text-2xl font-bold text-rose-950">댓글</h2>
      <LpCommentForm />

      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          onClick={() => setOrder("asc")}
          className={`cursor-pointer rounded-md px-3 py-1 text-sm font-semibold transition-colors duration-200 ${
            order === "asc"
              ? "bg-rose-600 text-white"
              : "bg-rose-100 text-rose-700 hover:bg-rose-200"
          }`}
        >
          오래된순
        </button>
        <button
          onClick={() => setOrder("desc")}
          className={`cursor-pointer rounded-md px-3 py-1 text-sm font-semibold transition-colors duration-200 ${
            order === "desc"
              ? "bg-rose-600 text-white"
              : "bg-rose-100 text-rose-700 hover:bg-rose-200"
          }`}
        >
          최신순
        </button>
      </div>

      <ul className="space-y-4">
        {comments?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((user) => (
            <li
              key={user.id}
              className="flex gap-3 rounded-2xl bg-rose-50 px-4 py-3 ring-1 ring-rose-100"
            >
              <img
                src={user.author.avatar}
                alt="avatar"
                className="h-10 w-10 rounded-full border border-rose-200 bg-white object-cover"
              />
              <div>
                <span className="font-semibold text-rose-950">
                  {user.author.name || "익명"}
                </span>
                <p className="mt-1 text-sm text-rose-900/75">{user.content}</p>
              </div>
            </li>
          ))}
      </ul>
      <div ref={ref} className="mt-4 h-10">
        {isFetchingNextPage && <CommentSkeleton />}
      </div>
    </div>
  );
};

export default LpCommentSection;
