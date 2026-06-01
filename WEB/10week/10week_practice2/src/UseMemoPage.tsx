import { useState, useMemo } from 'react';
import TextInput from './components/TextInput';
import { findPrimes } from './math';

export default function UseMemoPage() {
  const [limit, setLimit] = useState<number>(10000);
  const [text, setText] = useState<string>('');

  const primes = useMemo(() => {
    return findPrimes(limit);
  }, [limit]);

  const handleTextChange = (value: string) => {
    setText(value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px', alignItems: 'center' }}>
      <h1>useMemo 연산 최적화</h1>

      <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <span>소수 찾기 범위 입력</span>
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value) || 0)}
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '8px' }}
        />
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <span>다른 입력 테스트</span>
        <TextInput value={text} onChange={handleTextChange} />
      </label>

      <div style={{ marginTop: '20px', width: '100%', maxWidth: '600px' }}>
        <h2>발견된 소수 개수: {primes.length}개</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxHeight: '200px', overflowY: 'auto', padding: '10px', border: '1px solid #eee', borderRadius: '8px' }}>
          {primes.map((prime) => (
            <span key={prime} style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px', fontSize: '14px' }}>
              {prime}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}