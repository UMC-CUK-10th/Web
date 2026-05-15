import type { CommonResponse, PaginationDto } from "../types/common";
import { axiosInstance } from "./axios";
import type {
  Lp,
  LpDetail,
  ResponseCommentListDto,
  ResponseLpListDto,
} from "../types/lp";

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

export const getLpDetail = async (lpid: string | undefined) => {
  if (!lpid) {
    return null;
  }
  const { data } = await axiosInstance.get<CommonResponse<LpDetail>>(`/v1/lps/${lpid}`);
  return data;
};

export const getLpComments = async ({
  lpid,
  order,
  cursor,
}: {
  lpid: string;
  order: "asc" | "desc";
  cursor?: number;
}): Promise<ResponseCommentListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}/comments`, {
    params: {
      order,
      cursor,
      limit: 3,
    },
  });

  return data;
};

export const createLpComment = async ({
  lpid,
  content,
}: {
  lpid: string;
  content: string;
}) => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpid}/comments`, {
    content,
  });

  return data;
};

export const updateLpComment = async ({
  lpid,
  commentId,
  content,
}: {
  lpid: string;
  commentId: number;
  content: string;
}) => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpid}/comments/${commentId}`,
    {
      content,
    }
  );

  return data;
};

export const deleteLpComment = async ({
  lpid,
  commentId,
}: {
  lpid: string;
  commentId: number;
}) => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpid}/comments/${commentId}`
  );

  return data;
};

export const createLp = async ({
  title,
  content,
  thumbnail,
  tags,
  published,
}: {
  title: string;
  content: string;
  thumbnail?: string;
  tags: string[];
  published: boolean;
}): Promise<CommonResponse<Lp>> => {
  const { data } = await axiosInstance.post("/v1/lps", {
    title,
    content,
    thumbnail,
    tags,
    published,
  });

  return data;
};

export const updateLp = async ({
  lpid,
  title,
  content,
  thumbnail,
  tags,
  published,
}: {
  lpid: string;
  title: string;
  content: string;
  thumbnail?: string;
  tags: string[];
  published: boolean;
}): Promise<CommonResponse<Lp>> => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpid}`, {
    title,
    content,
    thumbnail,
    tags,
    published,
  });

  return data;
};

export const deleteLp = async (lpid: string) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpid}`);
  return data;
};

export const likeLp = async (lpid: string) => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpid}/likes`);
  return data;
};

export const unlikeLp = async (lpid: string) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpid}/likes`);
  return data;
};

export const uploadLpImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axiosInstance.post<CommonResponse<{ imageUrl: string }>>(
    "/v1/uploads",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data.data.imageUrl;
};
