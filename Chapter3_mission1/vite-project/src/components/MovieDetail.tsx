import type { MovieCreditsResponse, MovieDetailInfo } from '../types/movie';

interface MovieDetailProps {
  detail: MovieDetailInfo;
  credits: MovieCreditsResponse;
}

const MovieDetail = ({ detail, credits }: MovieDetailProps) => {
  const director = credits.crew.find((item) => item.job === 'Director');
  const castList = credits.cast.slice(0, 10);

  return (
    <div className="min-h-screen bg-black px-5 py-4 text-white">
      <div className="overflow-hidden rounded-2xl bg-zinc-950">
        <div className="relative h-120 w-full">
          <img
            src={`https://image.tmdb.org/t/p/original${detail.backdrop_path}`}
            alt={detail.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

          <div className="absolute left-5 top-5 max-w-[420px]">
            <h1 className="text-4xl font-bold">{detail.title}</h1>

            <div className="mt-3 text-lg leading-6 text-zinc-200">
              <p>평점 {detail.vote_average.toFixed(1)}</p>
              <p>{new Date(detail.release_date).getFullYear()}</p>
              <p>{detail.runtime}분</p>
            </div>

            <p className="mt-5 text-2xl font-normal italic">
              {detail.tagline || ''}
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-200 line-clamp-10">
              {detail.overview}
            </p>
          </div>
        </div>
      </div>

      <h2 className="mt-6 text-5xl font-bold">감독/출연</h2>

      <div className="mt-8 grid grid-cols-5 gap-x-6 gap-y-10 md:grid-cols-7 lg:grid-cols-10">
        {director && (
          <div className="text-center">
            {director.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w185${director.profile_path}`}
                alt={director.name}
                className="mx-auto h-24 w-24 rounded-full border-2 border-white object-cover"
              />
            ) : (
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-white bg-zinc-800 text-xs">
                No img
              </div>
            )}
            <p className="mt-3 text-sm font-bold">{director.name}</p>
            <p className="text-xs text-zinc-300">Director</p>
          </div>
        )}

        {castList.map((actor) => (
          <div key={actor.credit_id} className="text-center">
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                alt={actor.name}
                className="mx-auto h-24 w-24 rounded-full border-2 border-white object-cover"
              />
            ) : (
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-white bg-zinc-800 text-xs">
                No img
              </div>
            )}

            <p className="mt-3 text-sm font-bold">{actor.name}</p>
            <p className="text-xs text-zinc-300">{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;