export type Person = {
    id: number;
    name: string;
    role: string; // 출연(character) 혹은 직무(job)를 담을 필드
    profile_path: string | null;
}