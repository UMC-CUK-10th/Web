import { useMemo, useState } from "react";
import TextInput from "./components/TextInput";
import { findPrimeNumbers } from "./math";

export default function UseMemoPage(){
  console.log('rerender');

  const [limit, setLimit] = useState<number>(10000);
  const [text, setText] = useState('');

  const handleChangeText = (text: string) => {
    setText(text);
  };

  const primes = useMemo((): number[] => findPrimeNumbers(limit),[limit]);

  return (
    <div className='flex flex-col gap-4 h-dvh p-6'>
      <h1>같이 배우는 리액트: useMemo</h1>
      <label className='flex flex-col gap-2'>
        숫자 입력 (소수 찾기):
        <input
          value={limit}
          className='border p-4 rounded-lg'
          onChange={(e)=>setLimit(Number(e.target.value))}
        />
      </label>

      <h2>소수 리스트:</h2>
      <div className='whitespace-normal tracking-wide border p-4 rounded-lg max-h-60 overflow-y-auto leading-relaxed'>
        {primes.map((prime) => (
          <span key={prime}>
            {prime}{' '}
          </span>
        ))}
      </div>

      <label className='flex flex-col gap-2 mt-4'>
        다른 입력 텍스트: {text}
        <TextInput onChange={handleChangeText} />
      </label>
    </div>
  );
}