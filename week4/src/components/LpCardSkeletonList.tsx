import LpCardSkeleton from "./LpCardSkeleton";

interface LpCardSkeletonListProps {
  count: number;
}
const LpCardSkeletonList = ({ count }: LpCardSkeletonListProps) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <LpCardSkeleton key={index} />
      ))}
    </>
  );
};

export default LpCardSkeletonList;
