import { useTodo } from "../context/TodoContext";

type TodoItemProps = {
  text: string;
  index: number;
  type: "todo" | "done";
};

function TodoItem({ text, index, type }: TodoItemProps) {
  const { completeTodo, deleteDoneTodo } = useTodo();

  return (
    <li>
      <span>{text}</span>
      {type === "todo" ? (
        <button
          className="todo-complete-btn"
          onClick={() => completeTodo(index)}
        >
          완료
        </button>
      ) : (
        <button
          className="todo-delete-btn"
          onClick={() => deleteDoneTodo(index)}
        >
          삭제
        </button>
      )}
    </li>
  );
}

export default TodoItem;