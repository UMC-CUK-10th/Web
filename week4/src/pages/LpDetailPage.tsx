import { Outlet, useNavigate, useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useState } from "react";
import { Heart, MessageCircle, Pencil, Trash2 } from "lucide-react";

const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const navigate = useNavigate();
  const [commentOpen, setCommentOpen] = useState(false);

  const { data, isPending, isError } = useGetLpDetail(lpid || "");

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

  const handleComments = () => {
    setCommentOpen(true);
    navigate(`/lp/${data.id}/comments`);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#fafafa] px-6 py-10 text-gray-800">
      <div className="mx-auto max-w-4xl">
        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <p className="text-sm font-medium text-pink-500">
                {typeof data.author === "string"
                  ? data.author
                  : (data.author as any)?.name ?? "익명"}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {new Date(data.updatedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50"
              >
                <Pencil size={16} />
              </button>

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50"
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
            </div>
          </div>

          <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
            {data.title}
          </h1>

          {data.thumbnail && (
            <div className="mx-auto mb-6 max-w-md overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-sm">
              <img
                src={data.thumbnail}
                alt={data.title}
                className="aspect-square w-full object-cover"
              />
            </div>
          )}

          {data.content && (
            <p className="mx-auto max-w-2xl whitespace-pre-wrap text-center text-base leading-8 text-gray-600">
              {data.content}
            </p>
          )}

          {data.tags && data.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {data.tags.map((tag) => (
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
                {data.likes?.length ?? 0}
              </span>
            </div>
          </div>
        </section>

        {commentOpen && (
          <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <Outlet />
          </section>
        )}
      </div>
    </div>
  );
};

export default LpDetailPage;