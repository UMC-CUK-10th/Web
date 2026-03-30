import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "홈" },
  { to: "/movies/popular", label: "인기 영화" },
  { to: "/movies/now_playing", label: "상영 중" },
  { to: "/movies/top_rated", label: "평점 높은" },
  { to: "/movies/upcoming", label: "개봉 예정" },
];

export const Navbar = () => {
  return (
    <div className="flex gap-3 p-4">
      {LINKS.map(({ to, label }) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) => {
          return isActive 
            ? "text-sky-600 font-bold border-b-2 border-sky-600 pb-1" 
            : "text-slate-500 hover:text-sky-400 transition-colors";
        }}
      >
        {label}
      </NavLink>
      ))}
    </div>
  );
};