interface SelectBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id?: string;
  className?: string;
}

export const SelectBox = ({
  checked,
  onChange,
  label,
  id = "checkbox",
  className = "",
}: SelectBoxProps) => {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm transition hover:border-violet-300 hover:bg-violet-50 ${className}`}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
      />

      <span className="font-medium">{label}</span>
    </label>
  );
};