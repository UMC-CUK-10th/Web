export interface Tag {
    id: number;
    name: string;
}

export interface Like {
    id: number;
    userId: number;
    lpId: number;
}

export interface Lp {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    tags: Tag[];
    likes: Like[];
}

export interface LpListResponse {
    data: Lp[];
    nextCursor: number;
    hasNext: boolean;
}

export interface LpResponse {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    tags: Tag[];
    likes: Like[];
}