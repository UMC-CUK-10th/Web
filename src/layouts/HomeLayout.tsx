<<<<<<< HEAD
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
=======
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
    return (
        <div className="flex flex-col min-h-dvh">
            <nav className="p-4 border-b">내비게이션 바</nav>
            <main className="flex-1">
                <Outlet />
            </main>
            <footer className="p-4 border-t">푸터</footer>
        </div>
    );
>>>>>>> upstream/체컵/고원준
};

export default HomeLayout;