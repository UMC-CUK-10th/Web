import { useState, type FormEvent } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm = () => {
  const [input, setInput] = useState<string>("");
  const { addTodo } = useTodo();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = input.trim();

    if (text) {
      addTodo(text);
      setInput("");
    }
  };

  return (
    <form className="todo-container__form flex gap-2" onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        className="todo-container__input px-3 py-2 rounded-md border bg-white border-gray-300 text-black placeholder-gray-500"
        placeholder="할 일 입력"
        required
      />
      <button
        type="submit"
        className="todo-container__button px-4 py-2 rounded-md font-medium bg-green-600 text-white hover:bg-green-500"
      >
        할 일 추가
      </button>
    </form>
  );
};

export default TodoForm;