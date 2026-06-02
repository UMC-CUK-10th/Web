interface LANGUAGE_OPTIONS {
  value: string;
  label: string;
}

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: LANGUAGE_OPTIONS[];
  className?: string;
}

const LanguageSelector = ({
  value,
  onChange,
  options,
  className = "",
}: LanguageSelectorProps) => {
  return (
    <select
      className={`h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 shadow-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;