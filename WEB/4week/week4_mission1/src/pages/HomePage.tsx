import { Outlet, useLocation, Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";


const CATEGORIES = [
  {
    to: "/movies/popular",
    label: "Popular Movies",
    emoji: "🍯",
    desc: "",
    gradient: "from-emerald-950 to-neutral-950",
    border: "border-emerald-800/20 group-hover:border-teal-500/40",
    iconColor: "text-emerald-400"
  },
  {
    to: "/movies/now_playing",
    label: "Now Playing",
    emoji: "🍯",
    desc: "",
    gradient: "from-green-950 to-neutral-950",
    border: "border-green-800/20 group-hover:border-lime-500/40",
    iconColor: "text-lime-400"
  },
  {
    to: "/movies/top_rated",
    label: "Top Rated",
    emoji: "🍯",
    desc: "",
    gradient: "from-teal-950 to-neutral-950",
    border: "border-teal-800/20 group-hover:border-cyan-500/40",
    iconColor: "text-cyan-400"
  },
  {
    to: "/movies/upcoming",
    label: "Upcoming",
    emoji: "🍯",
    desc: "",
    gradient: "from-slate-900 to-neutral-950",
    border: "border-slate-800/20 group-hover:border-sky-500/40",
    iconColor: "text-sky-400"
  },
];

const HomePage = () => {
  const { pathname } = useLocation();
  const isRoot = pathname === "/";

  return (
    <div className="min-h-screen bg-[#041a13] text-white font-sans">
      <Navbar />

      {isRoot && (
        <div className="flex flex-col items-center">
          
          <section className="relative w-full flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden border-b border-emerald-900/30">
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-600 rounded-full blur-[160px]" />
              <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-teal-400 rounded-full blur-[120px]" />
            </div>

            <p className="text-xs font-bold tracking-[0.4em] uppercase text-emerald-300 mb-5 relative z-10">
              BeomFlix <span className="text-teal-500">Premium</span>
            </p>
            
            <h1 className="text-6xl md:text-8xl font-black leading-tight mb-6 tracking-tighter relative z-10 break-keep">
              All <span className="text-emerald-400">movies</span> are there
            </h1>
            
            <p className="text-emerald-100/70 text-lg md:text-xl max-w-2xl leading-relaxed mb-12 relative z-10 font-medium">
              Find movies that suit your taste at a glance, from popular titles to critical acclaim. Your cinematic journey starts here.
            </p>
            
            <Link
              to="/movies/popular"
              className="px-10 py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-950/40 text-sm tracking-wide relative z-10"
            >
              Start Exploring →
            </Link>
          </section>

          <section className="w-full max-w-6xl px-6 pb-32 pt-16">
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-emerald-400/60 mb-10 text-center border-b border-emerald-900/30 pb-4">
              Explore by Category
            </h2>
            

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CATEGORIES.map(({ to, label, emoji, desc, gradient, border, iconColor }) => (
                <Link
                  key={to}
                  to={to}

                  className={`relative group flex flex-col gap-3 p-6 rounded-3xl bg-gradient-to-br ${gradient} border ${border} transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-950/60 hover:bg-neutral-900/60`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{emoji}</span>
                    <span className={`${iconColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xl font-bold`}>→</span>
                  </div>
                  
                  <p className="font-extrabold text-base text-white group-hover:text-emerald-300 transition-colors pt-2">{label}</p>
                  <p className="text-xs text-emerald-100/50 leading-relaxed font-medium line-clamp-2">{desc}</p>
                  
                  <div className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r from-transparent via-emerald-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default HomePage;