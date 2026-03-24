import clsx from 'clsx';
import { THEME, useTheme } from './context/ThemeProvider';

export default function ThemeContent() {
  const { theme, toggleTheme } = useTheme();
    
  const isLightMode = theme === THEME.LIGHT;
  return (
  <div
    className={clsx('p-4 h-dvh w-full', isLightMode ? 'bg-white' : 'bg-gray-800')}
    >
      <h1 className ={clsx(
        'text-wxl font-bold',
        isLightMode ? 'text-black' : 'text-white'
      )}>
        Theme Content
      </h1>
      <p className = {clsx('mt-2', isLightMode ? 'text-black' : 'text-white')}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur aperiam quidem quia amet aut officia, nostrum dolorum at reprehenderit obcaecati alias nisi impedit odit veniam delectus inventore, minus exercitationem. Atque?
      </p>
    </div>
  );
}