const LpCardSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col gap-3">
      {/* Thumbnail Skeleton */}
      <div className="aspect-square w-full rounded-sm bg-gray-800"></div>

      <div className="space-y-2">
        {/* Subtitle Skeleton */}
        <div className="h-3 w-1/3 rounded-md bg-gray-700"></div>
        {/* Title Skeleton */}
        <div className="h-4 w-3/4 rounded-md bg-gray-600"></div>
        <div className="h-4 w-1/2 rounded-md bg-gray-600"></div>
        
        {/* Tags Skeleton */}
        <div className="flex gap-2 mt-2">
          <div className="h-3 w-10 rounded-md bg-gray-700"></div>
          <div className="h-3 w-12 rounded-md bg-gray-700"></div>
          <div className="h-3 w-8 rounded-md bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

export default LpCardSkeleton;
