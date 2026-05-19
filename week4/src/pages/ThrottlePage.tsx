import { useEffect, useState } from "react"
import useThrottle from "../hooks/queries/useThrottle";


const ThrottlePage = () => {

    const [scrollY,setScrollY] = useState<number>(0);

    // 안정적인 쓰로틀 콜백을 사용합니다 (이 함수는 참조가 안정적임)
        const handleScroll = useThrottle(() => {
            console.log("핸들러 실행", new Date().toLocaleTimeString());
            setScrollY(window.scrollY);
        }, 2000);

    // 렌더링 로그에 타임스탬프를 추가하면 콘솔에서 간격이 명확히 보입니다.
    console.log("리렌더링", new Date().toLocaleTimeString())
    useEffect(() => {
        // handleScroll은 useThrottleCallback으로 안정적인 참조를 반환하므로
        // 마운트/언마운트에서 한 번만 등록하면 됩니다.
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <div className="h-dvh flex flex-col items-center justify-center">
            <div>
                <h1>쓰로틀링이 무엇일까요?</h1>
                <p>ScrollY : {scrollY}px</p>
            </div>
        </div>
    )
}

export default ThrottlePage