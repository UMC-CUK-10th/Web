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