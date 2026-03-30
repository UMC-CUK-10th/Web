import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";

type TodoSectionProps = {
  title: string;
  type: "todo" | "done";
};

function TodoSection({ title, type }: TodoSectionProps) {
  const { todos, doneTodos } = useTodo();

  const items = type === "todo" ? todos : doneTodos;

  return (
    <div className="todo-section">
      <h2>{title}</h2>
      <ul>
        {items.map((item, index) => (
          <TodoItem key={index} text={item} index={index} type={type} />
        ))}
      </ul>
    </div>
  );
}

export default TodoSection;