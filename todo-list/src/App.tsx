import { useState } from 'react'
import './App.css'
import Card from './components/Card'
import Header from './components/Header'
import InputBar from './components/InputBar'
import LoadingBar from './components/LoadingBar'

interface Todo {
  id: string;
  text: string;
  isDone: boolean;
}

function App() {
  const nickname = "김햄찌"

  // 1. 상태 선언
  const [todos, setTodos] = useState<Todo[]>([
    { id: crypto.randomUUID(), text: "치카치카", isDone: false },
    { id: crypto.randomUUID(), text: "밥 먹기", isDone: true },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  // 2. 할 일 추가 함수
  const addTodo = (text: string) => {
    // 로딩 시작
    setIsLoading(true);

    // 1.5초 뒤에 실행
    setTimeout(() => {
      const newTodo = {
        id: crypto.randomUUID(),
        text,
        isDone: false
      };

      // 기존 todo 값 뒤에 새 todo 가 추가됨
      setTodos([...todos, newTodo]);

      // 로딩 종료
      setIsLoading(false);
    }, 1500);
  };

  // 3. 완료 버튼 함수
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      // 아이디 값을 비교해서 타겟을 찾음
      // 아이디가 일치함 -> 클릭한 대상 -> 기존 todo 정보를 가져옴 -> isDone 값만 기존값의 반대로 적용 (false -> true)
      // 아이디가 불일치 -> 그냥 기존값 그대로 둠 (false 유지)
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    ))
  }
  return (
    <>
      <main className="w-full min-h-screen flex flex-col items-center justify-center p-4">
        <Header nickname={nickname}></Header>

        <InputBar onAdd={addTodo}></InputBar>

        {isLoading ? (<LoadingBar></LoadingBar>) : (<div className="h-[72px]" />)}

        <section className="flex flex-row gap-6 w-full max-w-[600px] justify-center">
          <div className="flex-1">
            <h2 className="bg-[#FFF9C4] px-6 py-3 rounded-[16px] max-w-[120px] font-semibold mb-4 text-xl text-center mx-auto">할 일</h2>
            <ul id="todo_list">
              {todos.filter(t => !t.isDone).map(todo => (
                <Card key={todo.id} text={todo.text} onToggle={() => toggleTodo(todo.id)} ></Card>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <h2 className='bg-[#E1F5FE] px-6 py-3 rounded-[16px] max-w-[120px] font-semibold mb-4 text-xl text-center mx-auto'>완료</h2>
            <ul id="finish_list">
              {todos.filter(t => t.isDone).map(todo => (
                <Card key={todo.id} text={todo.text} onToggle={() => toggleTodo(todo.id)} isDone></Card>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
