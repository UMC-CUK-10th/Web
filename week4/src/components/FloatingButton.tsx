type FloatingButtonProps = {
  onClick: () => void;
};

const FloatingButton = ({ onClick }: FloatingButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex size-14 cursor-pointer items-center justify-center rounded-full bg-pink-500 text-3xl font-light text-white shadow-lg transition hover:bg-pink-600"
      aria-label="LP 작성 모달 열기"
    >
      <span className="mb-1">+</span>
    </button>
  );
};

export default FloatingButton;