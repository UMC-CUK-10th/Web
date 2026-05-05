import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { accessToken } = useAuth();

  const isLoggedIn =
    accessToken !== null &&
    accessToken !== "" &&
    accessToken !== "undefined";

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 bg-white shadow-lg transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-900">메뉴</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
            aria-label="메뉴 닫기"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-3 p-4">
          {isLoggedIn && (
            <Link
              to="/my"
              className="rounded-lg px-3 py-2 text-gray-700 transition hover:bg-pink-50 hover:text-pink-500"
              onClick={onClose}
            >
              마이페이지
            </Link>
          )}

          <Link
            to="/search"
            className="rounded-lg px-3 py-2 text-gray-700 transition hover:bg-pink-50 hover:text-pink-500"
            onClick={onClose}
          >
            검색
          </Link>
        </nav>
      </aside>
    </>
  );
}