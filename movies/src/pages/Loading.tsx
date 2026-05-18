export default function Loading() {
    // 햄스터 아이콘 스타일 정의
    const style = "text-6xl animate-bounce";

    return(
        <div className="flex justify-center items-center gap-4 h-60 w-full pb-10">
            <span className={style}>🐹</span>
            <span className={`${style} [animation-delay:0.15s]`}>🐹</span>
            <span className={`${style} [animation-delay:0.3s]`}>🐹</span>
        </div>
    )
}