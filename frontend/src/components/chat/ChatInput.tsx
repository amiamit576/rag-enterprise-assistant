import { useState } from "react";
import { Send } from "lucide-react";
import { askQuestion } from "../../api/chatApi";

interface Props {
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function ChatInput({
  setMessages,
}: Props) {
  const [question, setQuestion] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userQuestion = question;

    setQuestion("");

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: userQuestion,
      },
    ]);

    try {
      const response = await askQuestion({
        question: userQuestion,
      });

      setMessages((prev) => [
        ...prev,
        {
          type: "assistant",
          text: response.answer,
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border-t bg-white p-5">
      <div className="flex items-center gap-4">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 rounded-lg border px-4 py-3 outline-none"
          placeholder="Ask anything..."
        />

        <button
          onClick={handleAsk}
          className="rounded-lg bg-blue-600 p-3 text-white"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}