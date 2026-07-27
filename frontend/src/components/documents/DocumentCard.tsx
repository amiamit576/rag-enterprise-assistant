import {
  FileText,
  CheckCircle2,
} from "lucide-react";

interface Props {
  filename: string;
  pages: number;
  status: string;
  collapsed?: boolean;
}

export default function DocumentCard({
  filename,
  pages,
  status,
  collapsed = false,
}: Props) {

  // Sidebar Collapsed
  if (collapsed) {
    return (
      <button
        className="flex w-full justify-center rounded-xl bg-slate-800 p-3 transition hover:bg-slate-700"
        title={filename}
      >
        <FileText
          size={20}
          className="text-blue-400"
        />
      </button>
    );
  }

  return (
    <button
      className="group w-full rounded-xl border border-slate-800 bg-slate-800 p-4 text-left transition-all duration-200 hover:border-blue-500 hover:bg-slate-750 hover:shadow-lg"
    >
      <div className="flex items-start gap-3">

        {/* Icon */}
        <div className="rounded-lg bg-blue-600/20 p-2">
          <FileText
            size={20}
            className="text-blue-400"
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">

          <h3 className="truncate text-sm font-semibold text-white">
            {filename}
          </h3>

          <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
            <span>{pages} Pages</span>

            <span>•</span>

            <span>{status}</span>
          </div>

        </div>

        {/* Status */}
        <CheckCircle2
          size={18}
          className="mt-1 text-green-400"
        />

      </div>
    </button>
  );
}