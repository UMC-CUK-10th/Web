const CommentSkeleton = () => {
  return (
    <div className="flex items-start gap-3 p-4 w-full bg-fuchsia-50 rounded-lg shadow-sm animate-pulse">
      
      <div className="w-10 h-10 bg-gray-300 rounded-full" />

      
      <div className="flex flex-col flex-1 gap-2">
        <div className="w-1/3 h-4 bg-gray-300 rounded-md" /> 
        <div className="w-full h-3 bg-gray-200 rounded-md" /> 
      </div>
    </div>
  );
};

export default CommentSkeleton;