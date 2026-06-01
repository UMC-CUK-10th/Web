import { memo } from 'react';

interface Props {
  onClick: () => void;
}

const CountButton = memo(({ onClick }: Props) => {
  console.log('CountButton 렌더링됨');
  return <button onClick={onClick}>카운트 증가</button>;
});

export default CountButton;