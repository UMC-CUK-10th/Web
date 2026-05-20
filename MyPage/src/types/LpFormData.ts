export interface LpFormData {
  title: string;
  content: string;
  thumbnail: File | null;
  tags: string[];
  published: boolean;
}

export interface ImageUploadResponse {
  status: boolean;
  message: string;
  statusCode: number;
  data: {
    imageUrl: string;
  };
}