import { useState } from "react";

import ChatInput from "../components/chat/ChatInput";
import ChatWindow from "../components/chat/ChatWindow";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import type { ChatMessage } from "../types/chat";

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">

      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main */}
      <main className="flex flex-1 flex-col overflow-hidden">

        {/* Navbar */}
        <Navbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        {/* Chat */}
        <section className="flex flex-1 overflow-hidden bg-slate-100">

          <div className="mx-auto flex h-full w-full max-w-6xl flex-col">

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-8 py-8">
              <ChatWindow messages={messages} />
            </div>

            {/* Input */}
            <div className="border-t border-slate-200 bg-white px-8 py-6 shadow-lg">
              <ChatInput setMessages={setMessages} />
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}