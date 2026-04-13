// src/types/movie.ts

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Credits {
  cast: Cast[];
}

// ⚠️ 이 부분이 MovieDetailPage에서 쓰이는데, 없으면 에러가 납니다!
export interface MovieDetail extends Movie {
  tagline: string;
  genres: { id: number; name: string }[];
  runtime: number;
  revenue: number;
}