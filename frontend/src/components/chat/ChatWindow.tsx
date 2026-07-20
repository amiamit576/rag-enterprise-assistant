interface Props {
  messages: {
    type: "user" | "assistant";
    text: string;
  }[];
}

export default function ChatWindow({
  messages,
}: Props) {
  if (!messages.length) {
    return (
      <div className="flex flex-1 items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="mb-2 text-3xl font-bold">
            Welcome 👋
          </h2>

          <p className="text-gray-500">
            Upload a document and start asking questions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-6 bg-gray-50">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 flex ${
            message.type === "user"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <div
            className={`max-w-xl rounded-lg p-4 ${
              message.type === "user"
                ? "bg-blue-600 text-white"
                : "bg-white shadow"
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
}