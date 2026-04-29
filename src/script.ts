// 1. DOM 요소 선택 [12]
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

// 2. 타입 정의 및 상태 관리 [13]
type Todo = { id: number; text: string; };
let todos: Todo[] = [];
let doneTodos: Todo[] = [];

// 3. 할 일 추가 함수 [15, 16]
const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), text };
    todos.push(newTodo);
    todoInput.value = '';
    renderTasks();
};

// 4. 할 일 상태 변경 및 삭제 함수 [15, 16]
const completeTodo = (todo: Todo) => {
    todos = todos.filter(t => t.id !== todo.id);
    doneTodos.push(todo);
    renderTasks();
};

const deleteTodo = (todo: Todo) => {
    doneTodos = doneTodos.filter(t => t.id !== todo.id);
    renderTasks();
};

// 5. 할 일 아이템 생성 함수 [17-19]
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

// 6. 렌더링 함수 [14, 18, 19]
const renderTasks = () => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    todos.forEach(todo => todoList.appendChild(createTodoElement(todo, false)));
    doneTodos.forEach(todo => doneList.appendChild(createTodoElement(todo, true)));
};

// 7. 이벤트 리스너 [16, 17]
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) addTodo(text);
});

// 초기 렌더링
renderTasks();