import { NavLink } from "react-router-dom";

function Navbar() {
  const baseClass = "px-4 py-2 rounded-lg font-semibold transition-colors";
  const activeClass = "bg-black text-white";
  const inactiveClass = "bg-white text-black hover:bg-gray-200";

  return (
    <nav className="flex flex-wrap justify-center gap-3 mb-8">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : inactiveClass}`
        }
      >
        홈
      </NavLink>

      <NavLink
        to="/popular"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : inactiveClass}`
        }
      >
        인기 영화
      </NavLink>

      <NavLink
        to="/upcoming"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : inactiveClass}`
        }
      >
        개봉 예정
      </NavLink>

      <NavLink
        to="/top-rated"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : inactiveClass}`
        }
      >
        평점 높은
      </NavLink>

      <NavLink
        to="/now-playing"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : inactiveClass}`
        }
      >
        상영 중
      </NavLink>
    </nav>
  );
}

export default Navbar;