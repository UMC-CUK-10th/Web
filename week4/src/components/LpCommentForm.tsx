const LpCommentForm = () => {
  return (
    <form className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="댓글을 남겨주세요"
          className="flex-1 rounded-xl border border-rose-200 bg-white px-4 py-3 text-rose-950 placeholder:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          작성
        </button>
      </div>
    </form>
  );
};

export default LpCommentForm;
