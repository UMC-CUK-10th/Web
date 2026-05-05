import { MessageCircle } from "lucide-react";

interface FloatingButtonProps {
  onClick: () => void;
}

export default function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all active:scale-95 z-[999]"
    >
      <div className="relative">
        <MessageCircle size={32} />
      </div>
    </button>
  );
}