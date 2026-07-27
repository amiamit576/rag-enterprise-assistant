import api from "./axios";

import type { UploadResponse } from "../types/document";

export interface Document {
  filename: string;
  file_type: string;
  size: number;
  status: string;
  pages: number;
}

export async function uploadDocument(
  file: File
): Promise<UploadResponse> {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post<UploadResponse>(
    "/documents/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}

export async function getDocuments(): Promise<Document[]> {
  const { data } = await api.get<Document[]>("/documents");

  return data;
}