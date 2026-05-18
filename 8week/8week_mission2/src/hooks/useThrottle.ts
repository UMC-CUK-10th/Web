import { useRef, useCallback, useEffect } from "react";

export const useThrottle = (
  callback: () => void,
  delay: number = 3000
) => {
  const lastCall = useRef(0);
  // 매번 새로 들어오는 callback 함수를 기억할 ref
  const callbackRef = useRef(callback);

  // 컴포넌트가 리렌더링되어 callback이 바뀌면 ref만 슥 업데이트 해줍니다 (타이머 영향 X)
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(() => {
    const now = Date.now();

    // delay 안 지났으면 막기
    if (now - lastCall.current < delay) return;

    lastCall.current = now;

    // 항상 최신 상태의 함수를 실행
    callbackRef.current();
  }, [delay]); // 의존성 배열에서 callback을 빼서 쓰로틀이 리셋되는 걸 원천 차단!
};