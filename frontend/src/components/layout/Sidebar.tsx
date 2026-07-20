import {
  Bot,
  Database,
  BrainCircuit,
  Cpu,
} from "lucide-react";

import UploadArea from "../upload/UploadArea";
import DocumentCard from "../documents/DocumentCard";

import { useDocuments } from "../../hooks/useDocuments";

export default function Sidebar() {

  const {
    data: documents,
    isLoading,
  } = useDocuments();

  return (
    <aside className="flex h-screen w-80 flex-col border-r border-slate-800 bg-slate-900 text-white">

      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-600 p-3">
            <Bot size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold">
              Enterprise AI
            </h1>

            <p className="text-sm text-slate-400">
              RAG Assistant
            </p>
          </div>

        </div>
      </div>

      {/* Upload */}
      <div className="p-5">
        <UploadArea />
      </div>

      {/* Documents */}
      <div className="flex-1 overflow-y-auto px-5">

        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Documents
        </h2>

        {isLoading && (
          <p className="text-sm text-slate-400">
            Loading...
          </p>
        )}

        <div className="space-y-3">

          {documents?.map((doc) => (
            <DocumentCard
              key={doc.filename}
              filename={doc.filename}
              status={doc.status}
            />
          ))}

        </div>

      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 p-5">

        <div className="space-y-4 text-sm">

          <div className="flex items-center gap-3">
            <Database
              size={18}
              className="text-green-400"
            />
            <span>ChromaDB</span>
          </div>

          <div className="flex items-center gap-3">
            <Cpu
              size={18}
              className="text-blue-400"
            />
            <span>Local Embedding</span>
          </div>

          <div className="flex items-center gap-3">
            <BrainCircuit
              size={18}
              className="text-purple-400"
            />
            <span>Multi LLM</span>
          </div>

        </div>

      </div>

    </aside>
  );
}