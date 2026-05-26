import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingButton from "../components/FloatingButton";
import LpAdd from "../components/LpAdd";

function HomeLayout() {
  const [isLpAddOpen, setIsLpAddOpen] = useState(false);

  return (
    <div className="flex h-dvh flex-col">
      <Navbar />

      <main className="mt-16 flex-1">
        <Outlet />
      </main>

      <Footer />

      <FloatingButton onClick={() => setIsLpAddOpen(true)} />

      <LpAdd
        isOpen={isLpAddOpen}
        onClose={() => setIsLpAddOpen(false)}
      />
    </div>
  );
}

export default HomeLayout;