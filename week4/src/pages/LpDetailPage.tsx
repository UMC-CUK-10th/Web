import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Heart, MessageCircle, Pencil, Trash2, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import usePatchLps from "../hooks/mutations/usePatchLps";
import useDeleteLps from "../hooks/mutations/useDeleteLps";

const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [isEditMode, setIsEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const { data, isPending, isError } = useGetLpDetail(lpid || "");

  const { mutate: patchLpMutate, isPending: isPatching } = usePatchLps();
  const { mutate: deleteLpMutate, isPending: isDeleting } = useDeleteLps();

  useEffect(() => {
    if (data) {
      setEditTitle(data.title ?? "");
      setEditContent(data.content ?? "");
    }
  }, [data]);

  if (isPending) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#fafafa]">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#fafafa] text-lg font-medium text-red-500">
        상세 데이터를 불러올 수 없습니다.
      </div>
    );
  }

  const lp = data;
  const isCommentOpen = location.pathname.includes("/comments");

  const handleComments = () => {
    navigate(`/lp/${lp.id}/comments`);
  };

  const handleCancelEdit = () => {
    setEditTitle(lp.title ?? "");
    setEditContent(lp.content ?? "");
    setIsEditMode(false);
  };

  const handlePatchLp = () => {
    if (!editTitle.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    patchLpMutate(
      {
        lpId: lp.id,
        payload: {
          title: editTitle.trim(),
          content: editContent.trim(),
          thumbnail: lp.thumbnail,
          tags: lp.tags?.map((tag) => tag.name) ?? [],
          published: true,
        },
      },
      {
        onSuccess: () => {
          alert("LP가 수정되었습니다.");
          setIsEditMode(false);
        },
      }
    );
  };

  const handleDeleteLp = () => {
    const confirmed = window.confirm("정말 이 LP를 삭제하시겠습니까?");

    if (!confirmed) return;

    deleteLpMutate(lp.id, {
      onSuccess: () => {
        alert("LP가 삭제되었습니다.");
        navigate("/");
      },
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#fafafa] px-6 py-10 text-gray-800">
      <div className="mx-auto max-w-4xl">
        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <p className="text-sm font-medium text-pink-500">
                {typeof lp.author === "string"
                  ? lp.author
                  : lp.author?.name ?? "익명"}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {new Date(lp.updatedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {isEditMode ? (
                <>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50"
                  >
                    <X size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={handlePatchLp}
                    disabled={isPatching}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-pink-200 bg-pink-50 text-pink-500 transition hover:bg-pink-100 disabled:bg-gray-100 disabled:text-gray-300"
                  >
                    <Check size={16} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditMode(true)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={handleDeleteLp}
                    disabled={isDeleting}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:bg-red-50 hover:text-red-500 disabled:bg-gray-100 disabled:text-gray-300"
                  >
                    <Trash2 size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={handleComments}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-pink-200 bg-pink-50 text-pink-500 transition hover:bg-pink-100"
                  >
                    <MessageCircle size={16} />
                  </button>
                </>
              )}
            </div>
          </div>

          {isEditMode ? (
            <div className="mb-6">
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="LP 제목을 입력해주세요"
                className="mb-4 h-12 w-full rounded-xl border border-gray-300 px-4 text-center text-xl font-bold text-gray-900 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              />

              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="LP 내용을 입력해주세요"
                className="min-h-28 w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-center text-sm leading-7 text-gray-600 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              />
            </div>
          ) : (
            <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
              {lp.title}
            </h1>
          )}

          {lp.thumbnail && (
            <div className="mx-auto mb-6 max-w-md overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-sm">
              <img
                src={lp.thumbnail}
                alt={lp.title}
                className="aspect-square w-full object-cover"
              />
            </div>
          )}

          {!isEditMode && lp.content && (
            <p className="mx-auto max-w-2xl whitespace-pre-wrap text-center text-base leading-8 text-gray-600">
              {lp.content}
            </p>
          )}

          {lp.tags && lp.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {lp.tags.map((tag: { id: number; name: string }) => (
                <span
                  key={tag.id}
                  className="rounded-full bg-pink-50 px-3 py-1 text-sm font-medium text-pink-500"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-gray-600">
              <Heart size={16} className="text-pink-500" />
              <span className="text-sm font-medium">
                {lp.likes?.length ?? 0}
              </span>
            </div>
          </div>
        </section>

        {isCommentOpen && (
          <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <Outlet />
          </section>
        )}
      </div>
    </div>
  );
};

export default LpDetailPage;