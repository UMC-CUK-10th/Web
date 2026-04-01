import { useState, useEffect } from "react"

export default function Home() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log("컴포넌트 최초 실행 시 발생")
    }, [])
    return (
        <div>
            <h1>홈 화면</h1>
            <p>오늘 보고 싶은 영화 개수: {count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
        </div>
    )
}