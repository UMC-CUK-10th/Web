import useToggle from "../hooks/useToggle";

interface ToggleBarProps {
    title: string;
}
export default function ToggleBar({title}: ToggleBarProps) {
    const [isOpen, toggle] = useToggle(false);

    return (
        <div>
            <h1>{title}</h1>
            <button 
                onClick={toggle}
                className={`
                    w-12 h-6 rounded-full relative
                    transition-colors duration-300 ${isOpen ? "bg-green-500" : "bg-gray-300"}
                `}
            >
                <span
                    className={`
                        absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-md
                        transition-transform duration-300 ${isOpen ? 'translate-x-6' : 'translate-x-0'}
                    `}
                />
            </button>
        </div>
    )
}