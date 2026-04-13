export type MovieInfo = {
    title: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    runtime: number; // 분 단위로 들어옵니다.
    genres: { id: number; name: string }[];
}