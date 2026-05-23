const CommentSkeleton = () => {
  return (
    <div className="animate-pulse p-3 border-b">
      <div className="h-3 bg-gray-600 w-1/3 mb-2" />
      <div className="h-3 bg-gray-700 w-full" />
    </div>
  );
};

export default CommentSkeleton;