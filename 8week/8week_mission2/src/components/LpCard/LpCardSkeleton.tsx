const LpCardSkeleton = () => {
  return (
    <div className="relative w-full min-h-[200px] rounded-2xl overflow-hidden shadow-sm bg-gray-200 animate-pulse aspect-[4/3]">
      <div className="absolute inset-0 flex flex-col justify-end p-4 space-y-2">
        <div className="bg-gray-300 h-6 w-3/4 rounded-md" />
        <div className="flex justify-between items-center">
          <div className="bg-gray-300 h-4 w-1/4 rounded-md" />
          <div className="bg-gray-300 h-5 w-16 rounded-md" />
        </div>
      </div>
      
      <div className="absolute top-3 right-3 bg-gray-300 h-6 w-10 rounded-full" />
    </div>
  );
};

export default LpCardSkeleton;