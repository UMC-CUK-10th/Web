import { memo } from 'react';

// 자식 컴포넌트가 부모로부터 받을 Props의 타입을 TypeScript로 정의합니다.
interface ICountButtonProps {
  onClick: (num: number) => void;
}

const CountButton = ({ onClick }: ICountButtonProps) => {
  // 호출 시마다 콘솔에 기록하여 불필요한 리렌더링이 일어나는지 추적합니다.
  console.log('⚡ [Render] CountButton 컴포넌트가 렌더링되었습니다.');

  return (
    <button
      onClick={() => onClick(10)}
      className="border border-slate-400 bg-white text-slate-800 font-medium px-3 py-2 rounded-md hover:bg-slate-50 transition-colors duration-150"
    >
      카운트 증가
    </button>
  );
};

// React.memo로 감싸서 전달받는 onClick 함수의 참조값(주소)이 변하지 않으면 재렌더링을 막습니다.
export default memo(CountButton);