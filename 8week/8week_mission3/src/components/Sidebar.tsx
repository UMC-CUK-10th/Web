import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SearchModal from "./SearchModal";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { accessToken } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-2xl z-[70] p-6 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end mb-6">
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">
            <span className="text-xs font-bold text-gray-400 tracking-wider text-left">MENU</span>
          </div>

          <button
            onClick={() => {
              setIsSearchOpen(true);
              onClose();
            }}
            className="flex items-center gap-3 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-800 transition-colors w-full text-left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="font-medium">검색</span>
          </button>

          {accessToken && (
            <Link
              to={"/my"}
              onClick={onClose}
              className="flex items-center gap-3 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium">내 정보</span>
            </Link>
          )}
        </div>
      </div>

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default Sidebar;