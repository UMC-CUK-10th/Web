import { useCartStore } from "../store/useCartStore";

const Navbar = () => {
  const { amount } = useCartStore();

  return (
    <nav className="border-b border-white/5 bg-[#07140f]/80 backdrop-blur-xl text-white py-5 px-6 lg:px-20 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-2xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-200">
          GGULBEOM'S MUSIC
        </h1>
        <div className="relative flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full shadow-lg shadow-emerald-950/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-emerald-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          <span key={amount} className="text-lg font-black text-emerald-300 min-w-[1ch] text-center inline-block animate-[pop_0.25s_ease-out-in]">
            {amount}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;