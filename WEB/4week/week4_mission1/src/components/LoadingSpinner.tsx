export const LoadingSpinner = () => {
  return (
 <div className="relative size-24 flex items-center justify-center" role="status">
  <div className="text-5xl absolute">🍯</div>
  <div className="animate-spin text-4xl absolute h-full w-full flex justify-center pt-2">
    🐝
  </div>
</div>
  );
};