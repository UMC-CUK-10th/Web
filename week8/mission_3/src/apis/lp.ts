import api from "./axios";

export const getLPList = async (
  order: string,
  cursor: number
) => {
  const { data } = await api.get("/v1/lps", {
    params: {
      order,
      cursor,
      limit: 10,
    },
  });

  return data;
};

export const getLPDetail = async (id: string) => {
  const { data } = await api.get(`/v1/lps/${id}`);
  return data;
};

export const createLP = async (body: {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}) => {
  const { data } = await api.post("/v1/lps", body);
  return data;
};

// ========================
// LP 수정
// ========================
export const updateLP = async ({
  lpId,
  title,
  content,
  thumbnail,
}: {
  lpId: number;
  title: string;
  content: string;
  thumbnail?: string;
}) => {
  const { data } = await api.patch(`/v1/lps/${lpId}`, {
    title,
    content,
    thumbnail,
  });

  return data;
};

// ========================
// LP 삭제
// ========================
export const deleteLP = async (lpId: number) => {
  const { data } = await api.delete(`/v1/lps/${lpId}`);
  return data;
};

// ========================
// 🔥 LP 좋아요 (서버 기준: /likes)
// ========================
export const createLike = async (lpId: number) => {
  const { data } = await api.post(`/v1/lps/${lpId}/likes`);
  return data;
};