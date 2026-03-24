import { useTodo } from "../context/TodoContext";

function TodoInput() {
  const { input, setInput, addTodo } = useTodo();

  return (
    <div className="todo-input-box">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일 입력"
      />
      <button onClick={addTodo}>추가</button>
    </div>
  );
}

export default TodoInput;