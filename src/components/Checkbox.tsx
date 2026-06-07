interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id: string;
  className?: string;
}

export const Checkbox = ({ checked, onChange, label, id, className }: CheckboxProps) => {
  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-gray-300 bg-gray-200 text-blue-600 focus:ring-blue-500 cursor-pointer"
      />
      <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer">
        {label}
      </label>
    </div>
  );
};
