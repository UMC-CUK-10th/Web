import type { PaginationDto } from "../types/common";
import type {
  CreateLpsDto,
  RequestLpDto,
  ResponseLpCreateDto,
  ResponseLpDetailDto,
  ResponseLpListDto,
  UploadResponse,
} from "../types/lp";
import type { ResponseCommentListDto } from "../types/comment";
import { axiosInstance } from "./axios";

export const deleteLp = async ({ lpId }: RequestLpDto) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);

  return data;
};

export const patchLp = async ({
  lpId,
  payload,
}: {
  lpId: number;
  payload: Partial<CreateLpsDto>;
}) => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, payload);

  return data;
};

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

export const getLpDetail = async(lpid:string) : Promise<ResponseLpDetailDto> => {
    const {data} = await axiosInstance.get(`/v1/lps/${lpid}`);
    return data;
}

export const getComments = async ({
  lpId,
  cursor,
  limit,
  order,
}: {
  lpId: number;
  cursor: number;
  limit: number;
  order: PaginationDto["order"];
}): Promise<ResponseCommentListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: {
      cursor,
      limit,
      order,
    },
  });

  return data;
};

export const postLp = async (
  payload: CreateLpsDto
): Promise<ResponseLpCreateDto> => {
  const { data } = await axiosInstance.post("/v1/lps", payload);

  return data;
};



export const uploadImage = async (
  formData: FormData
): Promise<UploadResponse> => {
  try {
    const { data } = await axiosInstance.post("/v1/uploads", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error("이미지 업로드 API 실패:", error);
    throw new Error("이미지 업로드에 실패했습니다.");
  }
};


export const updateComment = async (
  lpId: number,
  commentId: number,
  content: string
) => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    {
      content,
    }
  );

  return data;
};

export const deleteComment = async (lpId: number, commentId: number) => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );

  return data;
};