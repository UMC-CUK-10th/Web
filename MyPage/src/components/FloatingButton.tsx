interface FloatingButtonProps {
    onClick: () => void;
}

export default function FloatingButton({ onClick }: FloatingButtonProps) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-8 right-8
                w-14 h-14
                bg-gray-700 text-white
                rounded-full
                flex items-center justify-center
                text-2xl shadow-lg
                hover:scale-110 hover:rotate-45
                transition-transform duration-200
                z-99
            "
        >+</button>
    )
}