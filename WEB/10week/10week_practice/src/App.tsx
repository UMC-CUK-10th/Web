import { useState } from 'react';
import CountButton from './components/CountButton';
import TextInput from './components/TextInput';

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const handleClick = () => setCount(c => c + 1);
  const handleChange = (value: string) => setText(value);

  return (
    <main className="relative min-h-screen bg-[#030a08] flex justify-center items-center px-4 py-10 font-sans overflow-hidden selection:bg-emerald-500/30">
      
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] bg-emerald-400/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div id="center" className="relative w-full max-w-[420px] bg-white/[0.02] border border-white/5 rounded-3xl p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] backdrop-blur-2xl flex flex-col gap-6 z-10">
        
        <header className="text-center">
          <span className="inline-block text-[10px] font-black tracking-[0.15em] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase mb-3 shadow-sm">
            Optimization Hook
          </span>
          <h1 className="text-xl font-extrabold text-white tracking-tight leading-snug">
            같이 배우는 리액트 <span className="text-emerald-400">useCallback</span>편
          </h1>
        </header>

        {/* 카운트 섹션 */}
        <section className="flex flex-col gap-3">
          <div className="bg-[#05110d]/90 border border-white/5 rounded-2xl p-5 flex flex-col gap-1 shadow-inner">
            <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">Count State</p>
            <p className="text-4xl font-black text-emerald-400 tracking-tight">{count}</p>
          </div>
          <CountButton onClick={handleClick} />
        </section>

        {/* 텍스트 섹션: 하단 bg-black/40과 p-2, border 설정을 통해 입력 칸을 감싸는 전용 박스 형태 구축 */}
        <section className="flex flex-col gap-3">
          <div className="bg-[#05110d]/90 border border-white/5 rounded-2xl p-5 flex flex-col gap-1 shadow-inner">
            <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">Live Text String</p>
            <p className="text-base font-medium text-slate-200 min-h-[1.5rem] break-all leading-relaxed">
              {text || <span className="text-gray-600 italic text-sm font-normal">입력 대기 중...</span>}
            </p>
          </div>
          <div className="bg-black/40 border border-white/10 rounded-2xl p-1.5 focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all">
            <TextInput value={text} onChange={handleChange} />
          </div>
        </section>

      </div>
    </main>
  );
}

export default App;