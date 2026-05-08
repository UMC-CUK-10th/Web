const LpCardSkeleton = () => {
  return (
    <div className="relative block animate-pulse overflow-hidden rounded-lg">
      <div className="aspect-square w-full rounded-lg bg-rose-200" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg bg-rose-300/35 px-4">
        <div className="h-5 w-3/5 rounded-full bg-rose-100/90" />
        <div className="h-4 w-2/5 rounded-full bg-rose-100/80" />
        <div className="h-4 w-1/5 rounded-full bg-rose-100/70" />
      </div>
    </div>
  );
};

export default LpCardSkeleton;
