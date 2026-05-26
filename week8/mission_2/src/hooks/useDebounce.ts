import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer); // 핵심: 이전 타이머 제거
    };
  }, [value, delay]);

  return debouncedValue;
}