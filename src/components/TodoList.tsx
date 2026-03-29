import { useTodo } from '../context/TodoContext';
import type { Todo } from '../context/TodoContext'; 
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos } = useTodo();

  const activeTodos = todos.filter((task: Todo) => !task.isDone);
  const doneTodos = todos.filter((task: Todo) => task.isDone);

  return (
    <div className="render-container">
      {/* task section */}
      <div className="render-container__section">
        <h2 className="render-container__title">Tasks</h2>
        <ul className="render-container__list">
          {activeTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>

      {/* completed section */}
      <div className="render-container__section">
        <h2 className="render-container__title">Completed</h2>
        <ul className="render-container__list">
          {doneTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;