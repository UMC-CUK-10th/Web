import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  return <div className="h-dvh flex flex-col bg-[#111111]">
    <nav className="bg-black">
        <Navbar />
    </nav>
    <main className="flex-1">
        <Outlet />
    </main>
    <footer>푸터입니다.</footer>
  </div>
}

export default HomeLayout;