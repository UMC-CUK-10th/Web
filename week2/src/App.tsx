import "./App.css";
import Todo from "./components/Todo";
import { TodoProvider } from "./context/TodoContext";

function InnerApp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef2f3] text-black">
      <div className="p-8 rounded-2xl shadow-lg bg-white">
        <Todo />
      </div>
    </div>
  );
}

function App() {
  return (
    <TodoProvider>
      <InnerApp />
    </TodoProvider>
  );
}

export default App;