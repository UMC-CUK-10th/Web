import { useState } from "react"

interface InputBarProps {
  onAdd: (text: string) => void;
}

export default function InputBar({ onAdd }: InputBarProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 페이지 새로고침 방지
    
    if (!value.trim()) {
      alert("값을 입력해주세요");
      return;
    }

    console.log(value)
    onAdd(value);
    setValue("");
  }

  return (
    <section className="mb-6 w-full max-w-[400px]">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="할 일을 입력하세요"
          className='
                flex-1 
                bg-transparent 
                px-5 py-4 
                text-lg 
                outline-none border-2 rounded-2xl 
                text-gray-700 placeholder:text-gray-400 
                focus:border-blue-400 transition-colors 
              '
        />
        <button
          type='submit'
          className="
                bg-blue-500 
                text-white 
                px-6 py-2 
                cursor-pointer
                rounded-2xl 
                hover:bg-blue-600 transition"
        >
          저장
        </button>
      </form>
    </section>
  )
}