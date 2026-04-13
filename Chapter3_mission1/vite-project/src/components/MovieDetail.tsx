import type { MovieCreditsResponse, MovieDetailInfo } from '../types/movie';
import { PersonCard } from './PersonCard';

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
          <PersonCard
            name={director.name}
            role="Director"
            profilePath={director.profile_path}
          />
        )}

        {castList.map((actor) => (
        <PersonCard
            key={actor.credit_id}
            name={actor.name}
            role={actor.character}
            profilePath={actor.profile_path}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;