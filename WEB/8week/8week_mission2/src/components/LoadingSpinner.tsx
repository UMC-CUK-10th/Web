// src/components/LoadingSpinner.tsx
const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000d1a] gap-8">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-32 w-32 animate-pulse rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-blue-900/30 bg-[#121212] shadow-[0_0_40px_rgba(59,130,246,0.2)] animate-[spin_3s_linear_infinite]">

          <div className="absolute inset-2 rounded-full border border-zinc-800" />
          <div className="absolute inset-4 rounded-full border border-zinc-800" />
          
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center shadow-inner">
            <div className="h-1 w-1 rounded-full bg-[#000d1a]" />
          </div>
          <span className="absolute -top-1 text-2xl">💿</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <p className="text-[14px] font-black tracking-[0.5em] text-blue-500 uppercase animate-pulse">
          Loading Record...
        </p>
        <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
    </div>
  );
};

export default LoadingSpinner;