import { useState } from 'react'; 
import { useTodo } from '../context/TodoContext'; 
const TodoInput = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const { addTodo } = useTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;


    setLoading(true);
    setTimeout(() => {
      addTodo(text);
      setText('');
      setLoading(false); 
    }, 500); 
  };

  return (
    <form className="todo-container__form" onSubmit={handleSubmit}>
      <input
        className="todo-container__input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your task"
        disabled={loading} 
      />
      <button className="todo-container__button" type="submit">
        {loading ? "loading..." : "Add Task"} 
      </button>
    </form>
  );
};

export default TodoInput;