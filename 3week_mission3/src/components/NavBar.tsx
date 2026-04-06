import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: '홈' },
  { to: '/category/popular', label: '인기 영화' },
  { to: '/category/now_playing', label: '상영 중' },
  { to: '/category/top_rated', label: '평점 높은' },
  { to: '/category/upcoming', label: '개봉 예정' },
];

const NavBar = () => {
  return (
    <nav className="flex items-center gap-6 p-6 bg-white border-b border-gray-100">
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) => 
            isActive ? "text-green-500 font-bold" : "text-gray-400 hover:text-gray-600"
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;