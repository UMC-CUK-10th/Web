import Todo from "./components/Todo";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { TodoProvider } from "./context/TodoContext";

function AppContent() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={
        isDarkMode
          ? "dark min-h-screen w-full"
          : "min-h-screen w-full"
      }
    >
      <TodoProvider>
        <Todo />
      </TodoProvider>
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
