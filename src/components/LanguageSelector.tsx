import { LANGUAGE_OPTIONS } from '../constants/movie';
import type { LanguageOption } from '../constants/movie';

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options?: LanguageOption[];
  className?: string;
}

export const LanguageSelector = ({
  value,
  onChange,
  options = LANGUAGE_OPTIONS,
  className,
}: LanguageSelectorProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className ?? ''}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
