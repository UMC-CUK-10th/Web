import { ThemeProvider, useTheme } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";

function AppContent() {
  const { isDark } = useTheme();

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen flex items-center justify-center bg-white text-black dark:bg-gray-900 dark:text-white">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold">다크모드</h1>
          <ThemeToggle />
          <div className="rounded-xl bg-gray-100 p-6 dark:bg-gray-800">
            현재 모드에 따라 색이 바뀝니다.
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;