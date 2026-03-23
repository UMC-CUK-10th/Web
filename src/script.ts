const btn = document.querySelector("button") as HTMLButtonElement;
const todo_form = document.querySelector("#todo_form") as HTMLFormElement;
const todo_input = document.querySelector("#todo_input") as HTMLInputElement;
const todo_container = document.getElementById("todo_container") as HTMLUListElement;

const finish_container = document.querySelector("#finish_container") as HTMLUListElement;

const isLoading = document.querySelector("#loading_indicator") as HTMLDivElement;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 이벤트 핸들러 안에서 여러 작업을 한 번에 처리하고 있음.
// 함수로 각 작업을 나눠주자.
todo_form.addEventListener("sumbit", async (e) => {
    // submit 의 기본동작은 페이지 새로고침. 이것을 방지.
    e.preventDefault();

    // 1. 빈 값이 있다면 alert
    isEmpty();

    // 2. 로딩 on
    await loading();

    // 3. todo 객체 생성
    createTodo();

    // 4. 입력창 clear
    todo_input.value = "";
})

async function loading(): Promise<void> {
    // visibility 속성은 해당 요소가 공간을 계속 차지하고 있음.
    isLoading.style.visibility = "visible";
    await delay(2000);
    isLoading.style.visibility = "hidden";
}

function isEmpty() {
    if (todo_input.value === "") {
        alert("할 일을 입력해주세요");
        return;
    }
}

function createTodo() {
    const todo = document.createElement("li");
    todo.className = "todo appear";

    const todo_title = document.createElement("h3");
    const todo_finish_btn = document.createElement("span");

    todo_title.innerText = todo_input.value;
    todo_finish_btn.innerText = "✔️";

    // 완료 버튼 이벤트 등록
    todo_finish_btn.addEventListener("click", () => {
        // 이미 완료 상태라면 삭제 함수를 부여
        addRemoveTodo(todo_finish_btn, todo);

        // todo -> finish
        finish_container.appendChild(todo);
        // 완료 목록으로 이동한 todo 의 title 과 btn 업데이트
        todo_finish_btn.innerText = "✖";
        todo_finish_btn.style.fontSize = "12px";
        todo_title.style.color = "#9ca3af";
        todo_finish_btn.style.transform = "translateY(1px)";

    })

    todo.appendChild(todo_title);
    todo.appendChild(todo_finish_btn);

    todo_container.appendChild(todo);
}

function addRemoveTodo(todo_finish_btn: HTMLSpanElement, todo: HTMLLIElement) {
    if (todo_finish_btn.innerText === "✖") {
        todo.remove();
        return;
    }
}