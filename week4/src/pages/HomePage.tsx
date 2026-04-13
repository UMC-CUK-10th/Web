export const HomePage = () => {
  return (
    <section className="flex w-full items-center justify-center">
      <div className="grid w-full items-center gap-10 rounded-[32px] bg-white/75 p-8 shadow-xl ring-1 ring-rose-200 backdrop-blur md:grid-cols-2 md:p-12">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-rose-100 px-4 py-1 text-sm font-semibold text-rose-600">
            히히
          </span>
          <div className="space-y-3">
            <h1 className="text-4xl font-black leading-tight text-rose-950 md:text-5xl">
              홈페이지!!!
            </h1>
            <p className="max-w-xl text-base leading-7 text-rose-900/70">
              안녕안녕
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
