const input = document.getElementById("todoInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const todoList = document.getElementById("todoList") as HTMLUListElement;
const doneList = document.getElementById("doneList") as HTMLUListElement;

addBtn.addEventListener("click", addTodo);

function addTodo(): void {
    const text: string = input.value.trim();
    if (text === "") {
        return;
    }
    const li: HTMLLIElement = document.createElement("li");
    li.innerHTML = `<span>${text}</span><button class="todo-complete-btn">완료</button>`;
    const button = li.querySelector("button") as HTMLButtonElement;
    button.onclick = () => {
        moveToDone(text);
        li.remove();
    };
    todoList.appendChild(li);
    input.value = "";
}

function moveToDone(text: string): void {
    const li: HTMLLIElement = document.createElement("li");
    li.innerHTML = `<span>${text}</span><button class="todo-delete-btn">삭제</button>`;
    const button = li.querySelector("button") as HTMLButtonElement;
    button.onclick = () => {
        li.remove();
    };
    doneList.appendChild(li);
}