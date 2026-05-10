import CommentSkeleton from "./CommentSkeleton";

interface CommentsProps {
  count: number;
}

const CommentSkeletonList = ({ count }: CommentsProps) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <CommentSkeleton key={idx} />
      ))}
    </div>
  );
};

export default CommentSkeletonList;