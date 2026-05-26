import api from "./axios";

export const getLPList = async (
  order: string
) => {
  const { data } = await api.get(
    `/lps?order=${order}`
  );

  return data;
};

export const getLPDetail = async (
  id: string
) => {
  const { data } = await api.get(
    `/lps/${id}`
  );

  return data;
};

export const createLP = async (
  body: {
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    published: boolean;
  }
) => {
  const { data } = await api.post(
    "/lps",
    body
  );

  return data;
};