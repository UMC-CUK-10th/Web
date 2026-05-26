import { useRef, useCallback, useEffect } from "react";

export const useThrottle = (
  callback: () => void,
  delay: number = 3000
) => {
  const lastCall = useRef(0);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(() => {
    const now = Date.now();

    if (now - lastCall.current < delay) return;

    lastCall.current = now;

    callbackRef.current();
  }, [delay]);
};