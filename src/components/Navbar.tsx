import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HamburgerButton } from './HamburgerButton'; // 햄버거 버튼 불러오기

interface NavbarProps {
  isOpen: boolean;
  onMenuClick: () => void;
}

const Navbar = ({ isOpen, onMenuClick }: NavbarProps) => {
  const { accessToken, userName } = useAuth();

  return (
    <nav className='bg-white dark:bg-gray-900 shadow-md fixed top-0 w-full z-50 h-16 flex items-center px-4 text-gray-900 dark:text-white'>
      <div className='flex items-center justify-between w-full max-w-7xl mx-auto'>
        <div className='flex items-center gap-3'>
          <HamburgerButton isOpen={isOpen} onClick={onMenuClick} />

          <Link to='/' className='text-xl font-bold'>
            SpinningSpinning Dolimpan
          </Link>
        </div>

        <div className='flex items-center gap-4'>
          {accessToken ? (
            <div className='flex items-center gap-4'>
              <span className='hidden sm:block text-sm'>
                <b className='text-blue-600 dark:text-blue-400'>{userName}</b>님
                반갑습니다.
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
