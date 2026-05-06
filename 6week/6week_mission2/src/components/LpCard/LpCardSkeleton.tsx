const LpCardSkeleton = () => {
  return (
    <div className="w-full h-80 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse flex flex-col">
      
      <div className="w-full flex-1 bg-gray-200" />

      <div className="p-4 space-y-4 bg-white">
        
        <div className="bg-gray-200 h-7 w-3/4 rounded-lg" />
        
        <div className="bg-gray-100 h-5 w-1/2 rounded-lg" />
        
      </div>

    </div>
  );
};

export default LpCardSkeleton;