export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
<<<<<<< HEAD
  data: T;
};

export type CursorBasedResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
  nextCursor: number;
  hasNext: boolean;
};

export interface PaginationDto {
  cursor?: number;
  limit?: number;
  order?: 'asc' | 'desc';
  search?: string;
=======
  data: T
>>>>>>> upstream/체컵/고원준
}