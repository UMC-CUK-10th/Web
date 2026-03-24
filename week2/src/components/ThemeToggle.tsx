import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className="theme-toggle"
    >
      {isDarkMode ? "Light" : "Dark"}
    </button>
  );
};

export default ThemeToggle;
