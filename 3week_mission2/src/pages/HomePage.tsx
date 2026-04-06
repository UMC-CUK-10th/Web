import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const HomePage = () => {
  return (
    <div className="bg-white min-h-screen">
      <NavBar />
      <div className="max-w-[1200px] mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;