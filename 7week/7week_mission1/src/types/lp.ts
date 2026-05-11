import type { CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
};

// 기존 리스트 응답 (커서 기반)
export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

// ✅ 상세 페이지 응답 타입 추가
// 서버가 { data: Lp } 형태로 주면 아래처럼, 바로 Lp를 주면 export type ResponseLpDetailDto = Lp; 로 하세요.
export type ResponseLpDetailDto = {
  data: Lp;
};