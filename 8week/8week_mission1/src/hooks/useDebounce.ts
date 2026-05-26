import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // delay 이후에 값을 업데이트하는 타이머 설정
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // [체크리스트] 언마운트/의존성 변경 시 타이머를 깨끗하게 정리 (clearTimeout)
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // [체크리스트] 지연 시간(delay) 변경 시 즉시 반영

  return debouncedValue;
}