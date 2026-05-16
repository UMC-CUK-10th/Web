import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className='min-h-screen flex flex-col relative'>
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className='flex flex-1 mt-16 relative'>
        <aside
          className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        >
          <div className='p-5'>
            <h3 className='font-bold mb-6 border-b pb-2 text-gray-800 dark:text-white'>
              카테고리
            </h3>
            <nav className='flex flex-col gap-4'>
              <Link
                to='/'
                onClick={closeSidebar}
                className='text-gray-700 hover:text-blue-500 font-medium'
              >
                홈으로
              </Link>
              <Link
                to='/search'
                onClick={closeSidebar}
                className='text-gray-700 hover:text-blue-500 font-medium'
              >
                검색하기
              </Link>
            </nav>
          </div>
        </aside>

        {isSidebarOpen && (
          <div
            className='fixed inset-0 bg-black/40 z-30'
            onClick={closeSidebar}
          />
        )}

        <main className='flex-1 p-6'>
          <Outlet />
        </main>
      </div>

      <Footer />

      <Link
        to='/create'
        className='fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl shadow-lg hover:bg-blue-700 transition-all z-20'
      >
        +
      </Link>
    </div>
  );
};

export default HomeLayout;
