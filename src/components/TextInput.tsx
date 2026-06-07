'use client';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TextInput({ value, onChange }: TextInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="large-input"
    />
  );
}