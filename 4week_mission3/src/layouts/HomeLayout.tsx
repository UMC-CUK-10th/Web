import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="p-2"> 
        네비게이션 바 입니다.
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;