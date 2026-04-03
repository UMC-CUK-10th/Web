"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const btn = document.querySelector("button");
const todo_input = document.querySelector("#todo_input");
const todo_container = document.getElementById("todo_container");
const finish_container = document.querySelector("#finish_container");
const isLoading = document.querySelector("#loading_indicator");
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
btn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    if (todo_input.value === "") {
        alert("할 일을 입력해주세요");
        return;
    }
    yield loading();
    const todo = document.createElement("li");
    todo.className = "todo appear";
    const todo_title = document.createElement("h3");
    const todo_finish_btn = document.createElement("span");
    todo_title.innerText = todo_input.value;
    todo_finish_btn.innerText = "✔️";
    todo_finish_btn.addEventListener("click", () => {
        if (todo_finish_btn.innerText === "✖") {
            todo.remove();
            return;
        }
        finish_container.appendChild(todo);
        todo_finish_btn.innerText = "✖";
        todo_finish_btn.style.fontSize = "12px";
        todo_title.style.color = "#9ca3af";
        todo_finish_btn.style.transform = "translateY(1px)";
    });
    todo.appendChild(todo_title);
    todo.appendChild(todo_finish_btn);
    todo_container.appendChild(todo);
    todo_input.value = "";
}));
function loading() {
    return __awaiter(this, void 0, void 0, function* () {
        isLoading.style.visibility = "visible";
        yield delay(2000);
        isLoading.style.visibility = "hidden";
    });
}
