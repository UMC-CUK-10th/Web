import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { accessToken, userName } = useAuth();

  return (
    <nav className='bg-white dark:bg-gray-900 shadow-md fixed top-0 w-full z-50 h-16 flex items-center px-4'>
      <div className='flex items-center justify-between w-full max-w-7xl mx-auto'>
        <div className='flex items-center gap-3'>
          <button
            onClick={onMenuClick}
            className='p-1 text-gray-700 dark:text-white hover:bg-gray-100 rounded transition-colors'
          >
            <svg
              width='32'
              height='32'
              viewBox='0 0 48 48'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='4'
                d='M7.95 11.95h32m-32 12h32m-32 12h32'
              />
            </svg>
          </button>

          <Link to='/' className='text-xl font-bold'>
            SpinningSpinning Dolimpan
          </Link>
        </div>

        <div className='flex items-center gap-4'>
          {accessToken ? (
            <div className='flex items-center gap-4'>
              <span className='hidden sm:block text-sm'>
                <b className='text-blue-600'>{userName}</b>님 반갑습니다.
              </span>
              <Link to='/my' className='text-sm hover:text-blue-500'>
                마이페이지
              </Link>
            </div>
          ) : (
            <div className='space-x-4'>
              <Link to='/login' className='text-sm hover:text-blue-500'>
                로그인
              </Link>
              <Link to='/signup' className='text-sm hover:text-blue-500'>
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
