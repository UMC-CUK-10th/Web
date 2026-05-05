import { Link } from "react-router-dom";

interface SideBarProps {
    isOpen: boolean
    onClose: () => void
}

export default function SideBar({ isOpen, onClose }: SideBarProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* 사이드바 메뉴 */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-blue-600">메뉴</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-black cursor-pointer">
              닫기 ✕
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            <Link to="/" onClick={onClose} className="p-2 hover:bg-blue-50 rounded">Home</Link>
            <Link to="/JsonPlaceholder" onClick={onClose} className="p-2 hover:bg-blue-50 rounded">JsonPlaceholder</Link>
          </nav>
        </div>
      </aside>
    </>
  );
}