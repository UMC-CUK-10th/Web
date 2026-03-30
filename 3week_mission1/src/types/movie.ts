export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieResponse = {
  page: number;
  results: [];
  total_pages: number;
  total_result: number;
};

export type MovieDetail = {
  id: number;
  title: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  tagline: string;
  overview: string;
  backdrop_path: string;
};

export type Credits = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};

export type Cast = {
  cast_id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type Crew = {
  credit_id: number;
  name: string;
  profile_path: string | null;
};