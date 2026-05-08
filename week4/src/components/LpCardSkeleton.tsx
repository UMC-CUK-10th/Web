const LpCardSkeleton = () => {
  return (
    <div className="block relative group animate-pulse">
      <div className="w-full bg-gray-300 h-48"></div>
      <div
        className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-400 inset-0
            flex flex-col justify-center text-center text-white bg-black/70 scale-110 rounded-lg"
      >
        <div className="bg-gray-400" />
      </div>
    </div>
  );
};

export default LpCardSkeleton;