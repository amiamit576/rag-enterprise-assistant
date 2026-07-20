import api from "./axios";

export interface ChatRequest {
  question: string;
}

export const askQuestion = async (data: ChatRequest) => {
  const response = await api.post("/chat", data);
  return response.data;
};