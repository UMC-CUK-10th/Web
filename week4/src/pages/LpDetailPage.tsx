import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/useGetLpDetail";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorDisplay from "../components/ErrorDisplay";
import LpCommentSection from "../components/LpCommentSection";

const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const { data, isLoading, isError } = useGetLpDetail(lpid);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorDisplay />;

  const lp = data?.data;

  if (!lp || !lp.author) {
    return (
      <div className="py-10 text-center text-red-500">
        데이터를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <div className="overflow-hidden rounded-[32px] bg-white/75 p-6 text-rose-950 shadow-xl ring-1 ring-rose-200 backdrop-blur sm:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img
              src={lp.author.avatar}
              alt="작성자 아바타"
              className="h-11 w-11 rounded-full border border-rose-200 object-cover"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-rose-400">
                Creator
              </p>
              <span className="text-base font-semibold text-rose-950">
                {lp.author.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm font-semibold text-rose-700">
            <button className="cursor-pointer rounded-full border border-rose-300 bg-white/80 px-4 py-2 transition-colors hover:border-rose-500 hover:text-rose-600">
              수정
            </button>
            <button className="cursor-pointer rounded-full border border-rose-300 bg-white/80 px-4 py-2 transition-colors hover:border-rose-500 hover:text-rose-600">
              삭제
            </button>
          </div>
        </div>

        <div className="mb-6 space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose-400">
            LP Detail
          </p>
          <h1 className="text-3xl font-black leading-tight text-rose-950 sm:text-4xl">
            {lp.title}
          </h1>
          <p className="text-sm text-rose-900/60">
            {new Date(lp.createdAt).toLocaleDateString()}
          </p>
        </div>

        <img
          src={lp.thumbnail}
          alt="lp 썸네일"
          className="mb-6 aspect-square w-full rounded-[28px] border border-rose-200 bg-rose-50 object-cover shadow-md"
        />

        <div className="mb-8 flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-rose-100 via-pink-100 to-orange-100 py-4">
          <button className="text-3xl transition-transform hover:scale-125">
            <span aria-hidden="true">❤️</span>
          </button>
          <span className="text-lg font-bold text-rose-900">
            {lp.likes.length}
          </span>
        </div>

        <div className="rounded-[28px] bg-rose-50/80 p-5 ring-1 ring-rose-100">
          <h2 className="mb-3 text-lg font-bold text-rose-950">소개</h2>
          <p className="whitespace-pre-wrap leading-7 text-rose-900/75">
            {lp.content}
          </p>
        </div>

        <div className="mt-10 rounded-[28px] bg-white/70 p-5 ring-1 ring-rose-100">
          <LpCommentSection lpid={lpid ?? ""} />
        </div>
      </div>
    </section>
  );
};

export default LpDetailPage;
