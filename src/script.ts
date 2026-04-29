const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

type Todo = { id: number; text: string; };
let todos: Todo[] = [];
let doneTodos: Todo[] = [];

const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), text };
    todos.push(newTodo);
    todoInput.value = '';
    renderTasks();
};

const completeTodo = (todo: Todo) => {
    todos = todos.filter(t => t.id !== todo.id);
    doneTodos.push(todo);
    renderTasks();
};

const deleteTodo = (todo: Todo) => {
    doneTodos = doneTodos.filter(t => t.id !== todo.id);
    renderTasks();
};

const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
    const li = document.createElement('li');
    li.className = '렌더의 컨테이너에 아이템';
    li.textContent = todo.text;

    const button = document.createElement('button');
    button.className = '두의 컨테이너에 버튼';
    button.textContent = isDone ? '삭제' : '완료';
    button.style.backgroundColor = isDone ? '#dc3545' : '#28a745';

    button.onclick = () => isDone ? deleteTodo(todo) : completeTodo(todo);
    
    li.appendChild(button);
    return li;
};

const renderTasks = () => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    todos.forEach(todo => todoList.appendChild(createTodoElement(todo, false)));
    doneTodos.forEach(todo => doneList.appendChild(createTodoElement(todo, true)));
};

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) addTodo(text);
});

renderTasks();
