interface CardProps {
    text: string;
    isDone?: boolean;
    onToggle: () => void;
}

export default function Card({ text, isDone, onToggle }: CardProps) {
    return (
        <li className={`
        flex
        justify-between
        max-w-xs
         bg-white
        border border-gray-100
        rounded-2xl
        p-4
        mb-3
        shadow-sm
         text-gray-700
        font-medium
        ${isDone ? 'opacity-50' : ''}
    `}>
            <span className={isDone ? 'line-through' : ''}>{text}</span>
            <span onClick={onToggle} className='cursor-pointer hover:scale-120 transition-transform'>{isDone ? "🐹" : "✅"}</span>
        </li>
    )
}