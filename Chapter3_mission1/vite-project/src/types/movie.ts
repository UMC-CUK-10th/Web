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
}

export type MovieResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export type Genre = {
    id: number;
    name: string;
}

export type MovieDetailInfo = {
    id: number;
    title: string;
    backdrop_path: string;
    tagline: string | null;
    vote_average: number;
    release_date: string;
    runtime: number | null;
    status: string;
    original_language: string;
    overview: string;
    poster_path: string | null;
    genres: Genre[];
}

export type CastMember = {
    credit_id: string;
    profile_path: string | null;
    name: string;
    character: string;
}

export type CrewMember = {
    credit_id: string;
    profile_path: string | null;
    name: string;
    job: string;
}

export type MovieCreditsResponse = {
    cast: CastMember[];
    crew: CrewMember[];
}
