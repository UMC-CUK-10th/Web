import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
const RootLayout = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc]"> 
      <Navbar /> 
      <main>
        <Outlet /> 
      </main>
    </div>
  );
};

export default RootLayout;