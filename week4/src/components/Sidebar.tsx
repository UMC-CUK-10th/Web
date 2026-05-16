import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import useDeleteUsers from "../hooks/mutations/useDeleteUsers";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { mutate: deleteUserMutate, isPending: isDeleting } =
    useDeleteUsers();

  const isLoggedIn =
    accessToken !== null &&
    accessToken !== "" &&
    accessToken !== "undefined";

  const handleDeleteUser = () => {
    deleteUserMutate(undefined, {
      onSuccess: () => {
        localStorage.clear();
        setDeleteModalOpen(false);
        onClose();
        navigate("/login");
      },
    });
  };

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

        <nav className="flex flex-col gap-2 p-4">
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

        {isLoggedIn && (
          <div className="absolute bottom-6 left-0 w-full px-4">
            <button
              type="button"
              onClick={() => setDeleteModalOpen(true)}
              className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-100"
            >
              탈퇴하기
            </button>
          </div>
        )}
      </aside>

      {deleteModalOpen && (
        <>
          <div
            className="fixed inset-0 z-[9998] bg-black/30"
            onClick={() => setDeleteModalOpen(false)}
          />

          <div className="fixed left-1/2 top-1/2 z-[9999] w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">회원 탈퇴</h3>

              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-center text-sm leading-6 text-gray-600">
              정말 탈퇴하시겠습니까?
              <br />
              탈퇴 후에는 계정 정보를 복구할 수 없습니다.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleDeleteUser}
                disabled={isDeleting}
                className="h-11 flex-1 rounded-xl bg-pink-500 text-sm font-semibold text-white transition hover:bg-pink-600 disabled:bg-gray-300"
              >
                {isDeleting ? "처리 중..." : "예"}
              </button>

              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="h-11 flex-1 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                아니요
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}