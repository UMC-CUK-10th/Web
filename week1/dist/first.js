"use strict";
const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const doneList = document.getElementById("doneList");
addBtn.addEventListener("click", addTodo);
function addTodo() {
    const text = input.value.trim();
    if (text === "") {
        return;
    }
    const li = document.createElement("li");
    li.innerHTML = `<span>${text}</span><button class="todo-complete-btn">완료</button>`;
    const button = li.querySelector("button");
    button.onclick = () => {
        moveToDone(text);
        li.remove();
    };
    todoList.appendChild(li);
    input.value = "";
}
function moveToDone(text) {
    const li = document.createElement("li");
    li.innerHTML = `<span>${text}</span><button class="todo-delete-btn">삭제</button>`;
    const button = li.querySelector("button");
    button.onclick = () => {
        li.remove();
    };
    doneList.appendChild(li);
}
