import TodoInput from "./components/TodoInput";
import TodoSection from "./components/TodoSection";
import { TodoProvider } from "./context/TodoContext";
import "./index.css";

function App() {
  return (
    <TodoProvider>
      <div className="todo-container">
        <h1>Todo List</h1>

        <TodoInput />

        <div className="todo-list">
          <TodoSection title="할 일" type="todo" />
          <TodoSection title="완료" type="done" />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;