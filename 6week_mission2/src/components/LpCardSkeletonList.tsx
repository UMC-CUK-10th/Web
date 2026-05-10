import LpCardSkeleton from './LpCardSkeleton';

interface LpCardSkeletonListProps {
  count?: number;
}

const LpCardSkeletonList = ({ count = 10 }: LpCardSkeletonListProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <LpCardSkeleton key={idx} />
      ))}
    </>
  );
};

export default LpCardSkeletonList;
