import { useTodo } from '../context/TodoContext';
import type { Todo } from '../context/TodoContext'; 

const TodoItem = ({ todo }: { todo: Todo }) => {
  const { toggleTodo, deleteTodo } = useTodo();

  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{todo.text}</span>
      <button
        className="render-container__item-button"
        style={{ backgroundColor: todo.isDone ? '#dc3545' : '#28a745' }}
        onClick={() => (todo.isDone ? deleteTodo(todo.id) : toggleTodo(todo.id))}
      >
        {todo.isDone ? 'delete' : 'complete'}
      </button>
    </li>
  );
};

export default TodoItem;