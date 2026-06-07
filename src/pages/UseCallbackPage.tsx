import { useState, useCallback } from 'react';
import CountButton from '../components/CountButton';
import TextInput from '../components/TextInput';

export default function UseCallbackPage() {
  const [count, setCount] = useState<number>(100);
  const [text, setText] = useState<string>('');

  console.log('🏢 [Render] 부모인 UseCallbackPage가 렌더링되었습니다.');

  const handleIncreaseCount = useCallback((number: number) => {
    setCount((prev) => prev + number);
  }, []);

  const handleTextChange = useCallback((inputText: string) => {
    setText(inputText);
  }, []);

  return (
    <div className="flex flex-col items-start min-h-screen bg-white gap-6 p-10">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-800">같이 배우는 리액트 useCallback편</h1>
      </div>

      {/* 카운터 섹션 */}
      <div className="flex flex-col items-start bg-white p-4 rounded-lg border border-slate-200 w-96 gap-3">
        <h2 className="text-base text-slate-700 mb-1">Count : <span className="text-2xl font-extrabold text-slate-900">{count}</span></h2>
        <CountButton onClick={handleIncreaseCount} />
      </div>

      {/* 텍스트 입력 섹션 */}
      <div className="flex flex-col items-start bg-white p-4 rounded-lg border border-slate-200 w-96 gap-2">
        <label className="text-sm text-slate-700">Text</label>
        <TextInput onChange={handleTextChange} />
      </div>
    </div>
  );
}