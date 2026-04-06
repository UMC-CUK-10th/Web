// src/components/navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">홈 페이지로 이동</Link>
      <Link to="/hello">입장 페이지로 이동</Link>
      <Link to="/bye">퇴장 페이지로 이동</Link>
    </nav>
  );
};

export default Navbar;