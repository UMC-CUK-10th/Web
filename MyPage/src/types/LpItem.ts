// 1. 화면에 사용하는 모든 필드를 포함하도록 수정
export interface LpItem {
  id: number;
  title: string;
  thumbnail: string;
  content: string;
  authorId: number;
  createdAt: string;
  likes: string[];
}

// 2. 서버에서 오는 전체 JSON 구조를 반영
export interface LpResponse {
  status: boolean;
  message: string;
  statusCode: number;
  data: {
    data: LpItem[];
    nextCursor: number | null;
    hasNext: boolean;
  };
}
