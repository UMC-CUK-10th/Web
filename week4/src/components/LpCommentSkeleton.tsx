const CommentSkeleton = () => {
  return (
    <div className="flex gap-3 animate-pulse">
      <div className="h-8 w-8 rounded-full bg-rose-200"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/4 rounded bg-rose-200"></div>
        <div className="h-4 w-3/4 rounded bg-rose-100"></div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
