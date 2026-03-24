import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded px-4 py-2 bg-black text-white dark:bg-yellow-300 dark:text-black"
    >
      {isDark ? "라이트모드" : "다크모드"}
    </button>
  );
}

export default ThemeToggle;