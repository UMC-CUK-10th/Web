'use client';

import React from 'react';

interface CountButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const CountButton = ({ onClick, children }: CountButtonProps) => {
  console.log(`${children} 버튼 렌더링`);
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white p-4 rounded-lg font-bold active:bg-blue-600"
    >
      {children}
    </button>
  );
};

export default React.memo(CountButton);