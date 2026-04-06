import { useTheme, THEME } from './context/ThemeProvider';
import clsx from 'clsx';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        'px-4 py-2 rounded-md transition-colors font-medium',
        isLightMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
      )}
    >
      {isLightMode ? '다크 모드' : '라이트 모드'}
    </button>
  );
};

export default ThemeToggleButton;