import { createContext, PropsWithChildren, useState } from 'react';

enum THEME {
  LIGHT = 'LIGHT',
  DARL = 'DARK',
}

type TTeme = THEME.LIGHT | THEME.DARK;

interface IThemeContext {
  theme: TTeme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<TTeme>(THEME.LIGHT);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === THEME.LIGHT ? THEME.DARL : THEME.LIGHT,
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
