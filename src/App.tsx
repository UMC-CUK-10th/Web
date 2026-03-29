import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <div className="todo-container">
      <h1 className="todo-container__header">GGULBEOM TODO</h1>
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;