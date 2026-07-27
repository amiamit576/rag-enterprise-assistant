import {
  Bot,
  Database,
  BrainCircuit,
  Cpu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import UploadArea from "../upload/UploadArea";
import DocumentCard from "../documents/DocumentCard";
import { useDocuments } from "../../hooks/useDocuments";

interface Props {
  collapsed: boolean;
  setCollapsed: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function Sidebar({
  collapsed,
  setCollapsed,
}: Props) {
  const {
    data: documents,
    isLoading,
  } = useDocuments();

  console.log("documents =", documents);
console.log("Is array?", Array.isArray(documents));
  return (
    <aside
      className={`relative flex h-screen flex-col border-r border-slate-800 bg-slate-900 text-white transition-all duration-300 ${
        collapsed ? "w-20" : "w-80"
      }`}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 z-50 rounded-full border border-slate-700 bg-slate-800 p-1.5 shadow-lg transition hover:bg-slate-700"
      >
        {collapsed ? (
          <ChevronRight size={16} />
        ) : (
          <ChevronLeft size={16} />
        )}
      </button>

      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <div
          className={`flex ${
            collapsed ? "justify-center" : "items-center gap-3"
          }`}
        >
          <div className="rounded-xl bg-blue-600 p-3 shadow-lg">
            <Bot size={22} />
          </div>

          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold">
                Enterprise AI
              </h1>

              <p className="text-sm text-slate-400">
                RAG Assistant
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Upload */}
      <div className="p-4">
        {collapsed ? (
          <div className="flex justify-center">
            <UploadArea collapsed />
          </div>
        ) : (
          <UploadArea />
        )}
      </div>

      {/* Documents */}
      <div className="flex-1 overflow-y-auto px-3">
        {!collapsed && (
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Documents
          </h2>
        )}

        {isLoading && !collapsed && (
          <p className="text-sm text-slate-400">
            Loading...
          </p>
        )}

        <div className="space-y-2">
          {documents?.map((doc) => (
            <DocumentCard
              key={doc.filename}
              filename={doc.filename}
              pages={doc.pages}
              status={doc.status}
              collapsed={collapsed}
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
            {!collapsed && <span>ChromaDB</span>}
          </div>

          <div className="flex items-center gap-3">
            <Cpu
              size={18}
              className="text-blue-400"
            />
            {!collapsed && (
              <span>Local Embeddings</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <BrainCircuit
              size={18}
              className="text-purple-400"
            />
            {!collapsed && (
              <span>Multi LLM</span>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}