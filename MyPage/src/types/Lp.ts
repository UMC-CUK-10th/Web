export interface Tag {
    id: number;
    name: string;
}

export interface Like {
    id: number;
    userId: number;
    lpId: number;
}

export interface LpBase {
    id: number;
    likes: Like[];
}

export interface Lp extends LpBase {
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    tags: Tag[];
}

export interface LpListResponse {
    data: Lp[];
    nextCursor: number;
    hasNext: boolean;
}

export interface LpResponse extends LpBase{
    title: string;
    content: string;
    thumbnail: string;
    tags: Tag[];
}