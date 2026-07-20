import { useState } from "react";

import ChatInput from "../components/chat/ChatInput";
import ChatWindow from "../components/chat/ChatWindow";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

export default function Home() {
  const [messages, setMessages] = useState<
    {
      type: "user" | "assistant";
      text: string;
    }[]
  >([]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex flex-1 flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Chat */}
        <section className="flex flex-1 overflow-hidden bg-slate-100">

          <div className="mx-auto flex w-full max-w-6xl flex-col">

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-8 py-8">
              <ChatWindow messages={messages} />
            </div>

            {/* Input */}
            <div className="border-t border-slate-200 bg-white px-8 py-6 shadow-lg">
              <ChatInput
                messages={messages}
                setMessages={setMessages}
              />
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}