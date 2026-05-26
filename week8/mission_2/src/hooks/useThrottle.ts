import { useEffect, useRef, useState } from "react";

export default function useThrottle<T>(value: T, interval = 300): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const remaining = interval - (now - lastExecuted.current);

    const timer = setTimeout(() => {
      if (remaining <= 0) {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }
    }, Math.max(remaining, 0));

    return () => clearTimeout(timer);
  }, [value, interval]);

  return throttledValue;
}