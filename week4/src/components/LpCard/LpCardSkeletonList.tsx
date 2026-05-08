type LpCardSkeletonListProps = {
  count?: number;
};

const LpCardSkeletonList = ({ count = 10 }: LpCardSkeletonListProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative aspect-square w-full animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          <div className="h-full w-full bg-gray-200" />
        </div>
      ))}
    </>
  );
};

export default LpCardSkeletonList;