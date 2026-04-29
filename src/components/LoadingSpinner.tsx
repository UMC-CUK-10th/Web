export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div 
        className="w-12 h-12 border-4 border-t-transparent border-green-400 rounded-full animate-spin" 
        role="status"
      >
        <span className="sr-only">로딩 중...</span>
      </div>
    </div>
  );
};