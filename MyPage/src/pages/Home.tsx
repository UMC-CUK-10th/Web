export default function Home() {
    const items = ["🐹", "🌻", "🐹", "🍌", "🐹", "🍎", "🐹", "🌼"];


    return (
        <div className="flex justify-center items-center h-screen w-full">
            <div className="relative flex justify-center items-center w-40 h-40">
                <h1 className="absolute text-xl font-black text-blue-600 z-10 whitespace-nowrap">
                    김햄찌입니다
                </h1>
                
                {/* 무한 회전: 타이틀에 집중하게 하는 요소*/}
                <div className="relative w-40 h-40 animate-[spin_10s_linear_infinite]">
                    {items.map((item, idx) => (
                        // 8개의 아이콘이니 각각 45도씩 떨어져 위치해야함
                        <span key={idx} className="absolute top-1/2 left-1/2 text-3xl" style={{ transform: `translate(-50%, -50%) rotate(${idx * 45}deg) translateY(-100px) rotate(-${idx * 45}deg)` }}>
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}