import { useEffect, useReducer, useRef } from "react";

function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, dispatchThrottledValue] = useReducer(
    (_state: T, nextValue: T) => nextValue,
    value
  );
  const lastExecutedAtRef = useRef(0);
  const timeoutIdRef = useRef<number | null>(null);

  useEffect(() => {
    const now = Date.now();
    const elapsed = now - lastExecutedAtRef.current;

    if (lastExecutedAtRef.current === 0 || elapsed >= interval) {
      dispatchThrottledValue(value);
      lastExecutedAtRef.current = now;
    } else {
      const remainingTime = interval - elapsed;

      if (timeoutIdRef.current !== null) {
        window.clearTimeout(timeoutIdRef.current);
      }

      timeoutIdRef.current = window.setTimeout(() => {
        dispatchThrottledValue(value);
        lastExecutedAtRef.current = Date.now();
        timeoutIdRef.current = null;
      }, remainingTime);
    }

    return () => {
      if (timeoutIdRef.current !== null) {
        window.clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    };
  }, [value, interval]);

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current !== null) {
        window.clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = null;
      lastExecutedAtRef.current = 0;
    };
  }, []);

  return throttledValue;
}

export default useThrottle;
