import { type ReactNode } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div
        className="fixed inset-0 z-[9998] bg-black/30"
        onClick={onClose}
      />

      <div
        className="fixed left-1/2 top-1/2 z-[9999] w-[92vw] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-gray-200 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">
            {title ?? "LP 작성"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100"
            aria-label="모달 닫기"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto px-6 py-6">
          {children}
        </div>
      </div>
    </>,
    document.body
  );
};