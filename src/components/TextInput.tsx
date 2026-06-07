import { memo } from 'react';

interface ITextInputProps {
  onChange: (text: string) => void;
}

const TextInput = ({ onChange }: ITextInputProps) => {
  console.log('✍️ [Render] TextInput 컴포넌트가 렌더링되었습니다.');

  return (
    <input
      type="text"
      placeholder=""
      onChange={(e) => onChange(e.target.value)}
      className="border-2 border-slate-300 focus:border-blue-500 outline-none p-4 rounded-lg w-80 transition-colors duration-150"
    />
  );
};

// React.memo로 감싸서 전달받는 onChange 함수의 참조값이 고정되어 있으면 재렌더링되지 않습니다.
export default memo(TextInput);