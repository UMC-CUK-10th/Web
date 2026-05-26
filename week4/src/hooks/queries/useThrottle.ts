import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, delay = 500): T {
    // 최종적으로 외부에 반환되는 쓰로틀된 값
    const [throttleValue, setThrottleValue] = useState<T>(value);

    // 마지막으로 실행된 시각 (ms). 0으로 초기화하여 첫 호출은 즉시 실행되게 함
    const lastExecuted = useRef<number>(0);

    // 타이머 id를 보관 (cleanup 시 사용)
    const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const now = Date.now();

        // 첫 호출 또는 충분한 시간이 지났으면 즉시 업데이트 (leading)
        if (lastExecuted.current === 0 || now >= lastExecuted.current + delay) {
            lastExecuted.current = now;
            setThrottleValue(value);
            return;
        }

        // 아직 delay가 지나지 않았으면 남은 시간만큼 기다려서 업데이트 (trailing)
        const remaining = Math.max(0, lastExecuted.current + delay - now);

        if (timerId.current) {
            clearTimeout(timerId.current);
        }

        timerId.current = setTimeout(() => {
            lastExecuted.current = Date.now();
            setThrottleValue(value);
            timerId.current = null;
        }, remaining);

        return () => {
            if (timerId.current) {
                clearTimeout(timerId.current);
                timerId.current = null;
            }
        };
    }, [value, delay]);

    // 언마운트 시 안전하게 타이머 정리
    useEffect(() => {
        return () => {
            if (timerId.current) {
                clearTimeout(timerId.current);
            }
        };
    }, []);

    return throttleValue;
}

export default useThrottle;