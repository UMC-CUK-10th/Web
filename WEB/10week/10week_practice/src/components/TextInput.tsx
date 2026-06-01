import { memo } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const TextInput = memo(({ value, onChange }: Props) => {
  console.log('TextInput 렌더링됨');
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
});

export default TextInput;