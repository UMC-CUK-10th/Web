import { useState, useMemo } from 'react';
import TextInput from './components/TextInput';
import { findPrimes } from './math';

export default function UseMemoPage() {
  const [limit, setLimit] = useState<number | ''>(10000);
  const [text, setText] = useState<string>('');

  const primes = useMemo(() => {
    if (limit === '') return [];
    return findPrimes(limit);
  }, [limit]);

  const handleTextChange = (value: string) => {
    setText(value);
  };

  return (
    <main className="relative min-h-screen bg-[#030a08] flex justify-center items-center px-4 py-10 font-sans overflow-hidden selection:bg-emerald-500/30">
      
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] bg-emerald-400/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div id="center" className="relative w-full max-w-[500px] bg-white/[0.02] border border-white/5 rounded-3xl p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] backdrop-blur-2xl flex flex-col gap-6 z-10">
        
        <header className="text-center">
          <span className="inline-block text-[10px] font-black tracking-[0.15em] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase mb-3 shadow-sm">
            Heavy Computation Optimization
          </span>
          <h1 className="text-xl font-extrabold text-white tracking-tight leading-snug">
            useMemo <span className="text-emerald-400">연산 최적화</span> 실습
          </h1>
        </header>

        <section className="flex flex-col gap-2">
          <div className="bg-[#05110d]/90 border border-white/5 rounded-2xl p-5 flex flex-col gap-2 shadow-inner">
            <label className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">소수 찾기 범위 입력</label>
            <div className="bg-black/40 border border-white/10 rounded-xl p-1 focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all">
              <input
                type="number"
                value={limit}
                onChange={(e) => {
                  const val = e.target.value;
                  setLimit(val === '' ? '' : Number(val));
                }}
                className="w-full h-11 bg-transparent px-3 text-sm text-white font-semibold focus:outline-none placeholder:text-gray-600"
                placeholder="범위를 입력하세요..."
              />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <div className="bg-[#05110d]/90 border border-white/5 rounded-2xl p-5 flex flex-col gap-2 shadow-inner">
            <label className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">다른 입력 테스트 (렌더링 방어)</label>
            <div className="bg-black/40 border border-white/10 rounded-xl p-1.5 focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all">
              <TextInput value={text} onChange={handleTextChange} />
            </div>
          </div>
        </section>

        <section className="w-full mt-2">
          <div className="bg-[#04140f] border border-emerald-500/10 rounded-2xl p-5 shadow-md">
            <h2 className="text-base font-bold text-slate-200 mb-3 flex justify-between items-center">
              <span>발견된 소수 개수</span>
              <span className="text-emerald-400 font-black text-xl animate-[pop_0.25s_ease-in-out]">{primes.length}개</span>
            </h2>
            
            <div className="flex flex-wrap gap-2 max-h-[160px] overflow-y-auto p-3 bg-black/30 border border-white/5 rounded-xl scrollbar-thin scrollbar-thumb-emerald-900/50 scrollbar-track-transparent">
              {primes.map((prime) => (
                <span 
                  key={prime} 
                  className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-md text-xs font-mono font-medium tracking-wide shadow-sm"
                >
                  {prime}
                </span>
              ))}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}