import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import ThemeToggle from "./ThemeToggle";
import { useTodo } from "../context/TodoContext";

const Todo = () => {
  const { todos, completeTodo, doneTodos, deleteTodo } = useTodo();

  return (
    <div className="todo-page">
      <div className="todo-container">
        <div className="todo-container__topbar">
          <div className="todo-container__topbar-spacer" />
          <ThemeToggle />
        </div>
        <h1 className="todo-container__header">TODO LIST</h1>
        <TodoForm />
        <div className="render-container">
          <TodoList
            title="할 일"
            todos={todos}
            buttonLabel="완료"
            buttonColor="#28a745"
            onClick={completeTodo}
          />

          <TodoList
            title="완료"
            todos={doneTodos}
            buttonLabel="삭제"
            buttonColor="#dc3545"
            onClick={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
};

export default Todo;
