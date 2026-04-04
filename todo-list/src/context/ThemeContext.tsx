// context = swift environmentObject

import { createContext, useState, useContext } from "react";
import type {ReactNode} from "react"; // type 을 붙여줘야 컴파일 오류 안남.

// 1. 타입 정의
interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

// 2. context 생성 - 값이 아직 부여되지 않음을 명시
const themeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. provider 컴포넌트 (데이터 공급)
export function ThemeProvider({ children } : {children: ReactNode}) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => setIsDarkMode((prev) => !prev);

    return (
        <themeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </themeContext.Provider>
    )
}

// 4. 커스텀 훅
export const useTheme = () => {
    const context = useContext(themeContext);
    if (!context) {
        throw new Error("themeProvider 안에서 사용할 것!")
    }
    return context;
}