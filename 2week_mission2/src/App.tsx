import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          {theme === "light" ? "☀️ LightMode" : "🌙 DarkMode"}
        </h1>
        <p className="text-gray-900 dark:text-gray-400">
          꿀범의 다크모드 구현!
        </p>
          <p className="text-gray-900 dark:text-gray-400">
          useContext를 통해 전역 상태 관리!
        </p>
        <button
          onClick={toggleTheme}
          className="px-6 py-3 rounded-full font-semibold
            bg-gray-900 text-white dark:bg-white dark:text-gray-900
            hover:opacity-80 transition-all duration-300"
        >
          {theme === "light" ? "🌙 DarkMode" : "☀️ LightMode"}
        </button>
      </div>
    </div>
  );
}

export default App;