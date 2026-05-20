interface LpSearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export default function LpSearchBar({ value, onChange }: LpSearchBarProps) {
    return (
        <input
            className="border rounded-4xl px-6 py-2 text-sm w-full h-12"
            placeholder="태그를 입력해주세요."
            value={value}
            onChange={(e) => onChange(e.target.value)}            
        />
    )
}