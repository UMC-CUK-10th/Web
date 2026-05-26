import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import usePatchComment from "../../hooks/mutations/usePatchComment";
import useDeleteComment from "../../hooks/mutations/useDeleteComment";

type CommentAuthor = {
  id: number;
  name: string;
  email?: string;
  avatar?: string | null;
};

type CommentCardProps = {
  id: number;
  content: string;
  author: CommentAuthor;
  lpId: number;
  currentUserId?: number;
};

const CommentCard = ({
  id,
  content,
  author,
  lpId,
  currentUserId,
}: CommentCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const isMyComment = currentUserId === author.id;

  const { mutate: patchCommentMutate, isPending: isPatching } =
    usePatchComment();

  const { mutate: deleteCommentMutate, isPending: isDeleting } =
    useDeleteComment();

  const handleEditSubmit = () => {
    const trimmedContent = editContent.trim();

    if (!trimmedContent) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    patchCommentMutate(
      {
        lpId,
        commentId: id,
        content: trimmedContent,
      },
      {
        onSuccess: () => {
          setIsEditMode(false);
          setMenuOpen(false);
        },
      }
    );
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm("댓글을 삭제하시겠습니까?");

    if (!isConfirmed) return;

    deleteCommentMutate(
      {
        lpId,
        commentId: id,
      },
      {
        onSuccess: () => {
          setMenuOpen(false);
        },
      }
    );
  };

  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-1 gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-50 text-sm font-bold text-pink-500">
            {author?.name?.charAt(0) ?? "?"}
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">
              {author?.name ?? "익명"}
            </p>

            {isEditMode ? (
              <div className="mt-3">
                <input
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleEditSubmit();
                    }
                  }}
                  className="h-10 w-full rounded-xl border border-gray-300 px-3 text-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                />

                <div className="mt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditMode(false);
                      setEditContent(content);
                    }}
                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
                  >
                    취소
                  </button>

                  <button
                    type="button"
                    onClick={handleEditSubmit}
                    disabled={isPatching}
                    className="rounded-lg bg-pink-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-pink-600 disabled:bg-gray-300"
                  >
                    {isPatching ? "수정 중..." : "저장"}
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-1 text-sm leading-6 text-gray-600">{content}</p>
            )}
          </div>
        </div>

        {isMyComment && !isEditMode && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100"
            >
              <MoreHorizontal size={18} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-9 z-20 w-24 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditMode(true);
                    setMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-50"
                >
                  수정
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="w-full px-3 py-2 text-left text-sm text-red-500 transition hover:bg-red-50 disabled:text-gray-300"
                >
                  {isDeleting ? "삭제 중" : "삭제"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;