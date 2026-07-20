import { useMutation } from "@tanstack/react-query";
import { askQuestion, type ChatRequest } from "../../src/api/chatApi";
import toast from "react-hot-toast";

export function useChat() {
  return useMutation({
    mutationFn: (data: ChatRequest) => askQuestion(data),

    onError: () => {
      toast.error("Failed to get AI response");
    },
  });
}