export interface User {
    id: number;
    name: string;
    email: string;

    // 나중에 추가한 필드들은 옵셔널 값으로 처리.
    bio: string | null;
    avatar: string | null;
}

export interface UpdateUserRequest {
    name: string;
    bio: string | null;
    avatar: string | null;
}