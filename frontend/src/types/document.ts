export interface UploadResponse {
  filename: string;
  file_type: string;
  pages: number;
  chunks: number;
  vectors: number;
  status: string;
}

export interface DocumentItem {
  filename: string;
  file_type: string;
  pages: number;
  chunks: number;
  vectors: number;
  status: string;
}