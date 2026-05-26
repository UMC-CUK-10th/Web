import LpCardSkeleton from "./LpCardSkeleton";

interface LpCardSkeletonListProps {
  count: number;
}

const LpCardSkeletonList = ({ count }: LpCardSkeletonListProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <LpCardSkeleton key={`skeleton-${idx}`} />
      ))}
    </>
  );
};

export default LpCardSkeletonList;