'use client';

import { useState, useMemo } from 'react';
import { findPrimeNumbers } from './utils/math';

export default function UseMemoPage() {
  console.log("렌더");
  const [limit, setLimit] = useState<number>(0);
  const [limitInput, setLimitInput] = useState<string>('0');
  

  // limit 상태가 변경될 때만 캐싱된 연산을 재수행
  const primes = useMemo(() => {
    return findPrimeNumbers(limit);
  }, [limit]);

  return (
    <div style={{ width: '100%' }}>
      <h1 style={{ textAlign: 'left', marginLeft: 16 }}>같이 배우는 리액트: useMemo</h1>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginLeft: 16, marginBottom: 8 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14 }}>숫자 입력 (소수 찾기):</span>
          <input
            type="number"
            value={limitInput}
            onChange={(e) => {
              const v = e.target.value;
              setLimitInput(v);
              const n = v === '' ? 0 : Number(v);
              setLimit(Number.isNaN(n) ? 0 : n);
            }}
            style={{ width: 120 }}
          />
        </label>

        {/* removed secondary test input to match the video layout */}
      </div>

      <h2 style={{ textAlign: 'left', margin: '12px 0 8px 16px' }}>소수 리스트:</h2>

      <div className="primes-list" style={{ marginLeft: 16 }}>
        {primes.join(' ')}
      </div>
    </div>
  );
}