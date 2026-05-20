import { useRef, useCallback } from "react";

export function useThrottle<T extends (...args: any[]) => any>(fn: T, delay: number): T {
    // 마지막으로 함수가 호출된 시간을 저장
    // useRef : 값이 바뀌어도 리렌더링이 안 일어남
    const lastCall = useRef(0);

    // useCallback : 메모이제이션. fn, delay 변동 시에만 새로운 함수를 만듬
    return useCallback((...args: unknown[]) => {
        // 현재 시간으로부터 딜레이만큼의 시간이 지났으면 실행
        const now = Date.now();
        if (now - lastCall.current >= delay) {
            lastCall.current = now;
            fn(...args);
        }
    }, [fn, delay]) as T;
}